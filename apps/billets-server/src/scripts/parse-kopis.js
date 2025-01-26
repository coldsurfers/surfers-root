/* eslint-disable @typescript-eslint/no-var-requires */
const dateFns = require('date-fns')
const dotenv = require('dotenv')
const xml2js = require('xml2js')
const { PrismaClient } = require('@prisma/client')
const { S3Client: AWSS3Client } = require('@aws-sdk/client-s3')
const S3Client = new AWSS3Client({
  region: process.env.COLDSURF_AWS_REGION,
  credentials: {
    accessKeyId: process.env.COLDSURF_AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.COLDSURF_AWS_SECRET_ACCESS_KEY ?? '',
  },
})
const { PutObjectCommand } = require('@aws-sdk/client-s3')

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
})

dotenv.config()

const parser = new xml2js.Parser({ explicitArray: false })

async function getList() {
  await dbClient.$connect()
  const currentDate = dateFns.format(new Date(), 'yyyyMMdd')
  const endDate = '20251231'
  const 대중음악 = 'CCCD'
  const response = await fetch(
    `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.KOPIS_KEY}&stdate=${currentDate}&eddate=${endDate}&rows=100&cpage=1&shcate=${대중음악}`,
  )
  const xmlText = await response.text()

  const parsePromise = () =>
    new Promise((resolve, reject) => {
      parser.parseString(xmlText, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result.dbs)
      })
    })

  const dbs = await parsePromise()
  const { db } = dbs
  const items = db.map((dbItem) => {
    return {
      id: dbItem.mt20id,
      title: dbItem.prfnm,
      poster: dbItem.poster,
      date: dbItem.prfpdfrom,
      venue: dbItem.fcltynm,
    }
  })

  for (const item of items) {
    const fetchedPoster = await fetch(item.poster)
    const buffer = await fetchedPoster.arrayBuffer()
    const posterKey = `billets/poster-thumbnails/${new Date().toISOString()}`
    // await S3Client.send(
    //   new PutObjectCommand({
    //     Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
    //     Key: posterKey,
    //     Body: buffer,
    //     ContentType: `image/png`,
    //     CacheControl: 'public, max-age=31536000, immutable',
    //   }),
    // )
    const existing = await dbClient.concert.findFirst({
      where: {
        kopisEvent: {
          id: item.id,
        },
      },
    })
    const venue = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${item.venue}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
      },
    })
    const venueJson = await venue.json()
    const existingVenue = (
      await dbClient.venue.findMany({
        where: {
          name: venueJson?.['documents']?.[0]?.['place_name'],
        },
      })
    ).at(0)
    console.log(venueJson?.['documents']?.[0], item.venue)
    console.log(existing, existingVenue)
    if (existing) {
      if (existingVenue) {
        const existingConcertOnVenue = await dbClient.concertsOnVenues.findUnique({
          where: {
            concertId_venueId: {
              concertId: existing.id,
              venueId: existingVenue.id,
            },
          },
        })
        if (!existingConcertOnVenue) {
          await dbClient.concertsOnVenues.create({
            data: {
              concertId: existing.id,
              venueId: existingVenue.id,
            },
          })
        }
      }
      //   await dbClient.concert.update({
      //     where: {
      //       id: existing.id,
      //       kopisEvent: {
      //         id: item.id,
      //       },
      //     },
      //     data: {
      //       posters: {
      //         create: {
      //           poster: {
      //             create: {
      //               imageURL: `https://api.billets.coldsurf.io/v1/image?key=${posterKey}`,
      //             },
      //           },
      //         },
      //       },
      //     },
      //   })
    } else {
      const event = await dbClient.concert.create({
        data: {
          title: item.title,
          date: new Date(item.date),
          isKOPIS: true,
          kopisEvent: {
            create: {
              id: item.id,
            },
          },
        },
      })
    }
  }
  await dbClient.$disconnect()
}

getList()
