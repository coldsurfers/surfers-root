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
const ngeohash = require('ngeohash')

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
})

dotenv.config()

const parser = new xml2js.Parser({ explicitArray: false })

function areaToLocationCityId(area) {
  switch (area) {
    case '서울특별시':
      return 'a0cdb908-7cf9-4b3d-b750-e09f4f154ef5'
    case '인천광역시':
      return 'aa994394-aeee-4a86-9fe8-88185a20c593'
    default:
      return null
  }
}

function extractFirstTimes(input) {
  const regex = /[가-힣A-Z]+[\w\s~]*(\([\d:,]+\))/g // Matches each day and its times
  const matches = input.match(regex)

  if (!matches) return []

  return matches
    .map((match) => {
      const timeMatch = match.match(/\d{2}:\d{2}/) // Extract the first time
      return timeMatch ? timeMatch[0] : null
    })
    .filter(Boolean) // Filter out null values
}

async function uploadPoster(posterUrl) {
  const fetchedPoster = await fetch(posterUrl)
  const buffer = await fetchedPoster.arrayBuffer()
  const posterKey = `billets/poster-thumbnails/${new Date().toISOString()}`
  await S3Client.send(
    new PutObjectCommand({
      Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
      Key: posterKey,
      Body: buffer,
      ContentType: `image/png`,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )

  return {
    posterKey,
  }
}

async function findVenue(venue) {
  const kakaoSearchResponse = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${venue}`, {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
    },
  })
  const kakaoJson = await kakaoSearchResponse.json()
  const existingVenue = (
    await dbClient.venue.findMany({
      where: {
        name: kakaoJson?.['documents']?.[0]?.['place_name'] ?? '',
      },
    })
  ).at(0)

  return {
    existingVenue,
    kakaoSearchFirstResult: kakaoJson?.['documents']?.[0],
  }
}

/**
 *
 * @param {string} kopisEventId
 * @param {string} timeString ex) 14:00
 */
async function updateTime(kopisEventId, eventDate) {
  const existingEvent = await dbClient.concert.findFirst({
    where: {
      kopisEvent: {
        id: kopisEventId,
      },
    },
  })
  if (!existingEvent) {
    return
  }
  await dbClient.concert.update({
    where: {
      id: existingEvent.id,
    },
    data: {
      date: eventDate,
    },
  })
}

async function connectOrCreateTicket(kopisEventId, ticketSeller, ticketURL) {
  const existingEvent = await dbClient.concert.findFirst({
    where: {
      kopisEvent: {
        id: kopisEventId,
      },
    },
  })
  if (!existingEvent) {
    return
  }
  const connectedTicket = (
    await dbClient.concertsOnTickets.findMany({
      where: {
        concertId: existingEvent.id,
      },
    })
  ).at(0)

  if (!connectedTicket) {
    const createdTicket = await dbClient.ticket.create({
      data: {
        openDate: new Date(),
        seller: ticketSeller,
        sellingURL: ticketURL,
      },
    })
    await dbClient.concertsOnTickets.create({
      data: {
        concertId: existingEvent.id,
        ticketId: createdTicket.id,
      },
    })
  }
}

async function connectLocationCity(eventId, area) {
  const locationCityId = areaToLocationCityId(area)
  if (!locationCityId) {
    return
  }
  await dbClient.concert.update({
    where: {
      id: eventId,
    },
    data: {
      locationCity: {
        connect: {
          id: locationCityId,
        },
      },
    },
  })
}

async function connectOrCreateVenue(venue, eventId) {
  const { existingVenue, kakaoSearchFirstResult } = await findVenue(venue)

  if (!existingVenue && !kakaoSearchFirstResult) {
    const connected = (
      await dbClient.concertsOnVenues.findMany({
        where: {
          concertId: eventId,
        },
      })
    ).at(0)
    if (!connected) {
      console.log('not connected venue:', eventId, venue)
    }
  }

  if (!existingVenue) {
    if (kakaoSearchFirstResult) {
      const lat = +kakaoSearchFirstResult?.['y']
      const lng = +kakaoSearchFirstResult?.['x']
      const geohash = ngeohash.encode(lat, lng, 12)
      const createdVenue = await dbClient.venue.create({
        data: {
          lat,
          lng,
          name: kakaoSearchFirstResult?.['place_name'],
          address: kakaoSearchFirstResult?.['road_address_name'],
          geohash,
        },
      })
      await dbClient.concertsOnVenues.create({
        data: {
          concertId: eventId,
          venueId: createdVenue.id,
        },
      })
    }
  } else {
    const connected = await dbClient.concertsOnVenues.findUnique({
      where: {
        concertId_venueId: {
          concertId: eventId,
          venueId: existingVenue.id,
        },
      },
    })
    if (!connected) {
      await dbClient.concertsOnVenues.create({
        data: {
          concertId: eventId,
          venueId: existingVenue.id,
        },
      })
    }
  }
}

async function insertKOPISEvents(page) {
  const currentDate = dateFns.format(new Date(), 'yyyyMMdd')
  const endDate = '20251231'
  const 대중음악 = 'CCCD'
  const response = await fetch(
    `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.KOPIS_KEY}&stdate=${currentDate}&eddate=${endDate}&rows=100&cpage=${page}&shcate=${대중음악}`,
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
      area: dbItem.area,
    }
  })

  for (const item of items) {
    const existing = (
      await dbClient.concert.findMany({
        where: {
          kopisEvent: {
            id: item.id,
          },
        },
      })
    ).at(0)
    if (existing) {
      await connectLocationCity(existing.id, item.area)
      await connectOrCreateVenue(item.venue, existing.id)
    } else {
      const locationCityId = areaToLocationCityId(item.area)
      const event = await dbClient.concert.create({
        data: {
          title: item.title,
          // date: new Date(item.date),
          isKOPIS: true,
          kopisEvent: {
            create: {
              id: item.id,
            },
          },
          ...(locationCityId && {
            locationCity: {
              connect: {
                id: locationCityId,
              },
            },
          }),
        },
      })
      const { posterKey } = await uploadPoster(item.poster)
      const poster = await dbClient.poster.create({
        data: {
          imageURL: `https://api.billets.coldsurf.io/v1/image?key=${posterKey}`,
        },
      })
      await dbClient.concertsOnPosters.create({
        data: {
          posterId: poster.id,
          concertId: event.id,
        },
      })
      await connectOrCreateVenue(item.venue, event.id)
    }
  }

  return {
    items,
  }
}

async function insertKOPISEventDetail(kopisEventId) {
  const response = await fetch(
    `http://www.kopis.or.kr/openApi/restful/pblprfr/${kopisEventId}?service=${process.env.KOPIS_KEY}`,
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
  if (!db.relates) {
    return
  }
  const { relates, dtguidance, prfpdfrom } = db

  if (dtguidance && prfpdfrom) {
    const times = extractFirstTimes(dtguidance)
    if (times[0]) {
      /**
       * prfpdfrom: ex) 2024.01.01
       */
      const eventDate = new Date(`${prfpdfrom} ${times[0]}`)
      await updateTime(kopisEventId, eventDate)
    }
  }

  if (!relates.relate) {
    return
  }
  const { relate } = relates
  if (Array.isArray(relate)) {
    await Promise.all(
      relate.map(async (relate) => {
        if (relate.relatenm && relate.relateurl) {
          const { relatenm: ticketSeller, relateurl: ticketSellingURL } = relate
          await connectOrCreateTicket(kopisEventId, ticketSeller, ticketSellingURL)
        }
      }),
    )
  }
  if (!relate.relatenm || !relate.relateurl) {
    return
  }
  const { relatenm: ticketSeller, relateurl: ticketSellingURL } = relate

  await connectOrCreateTicket(kopisEventId, ticketSeller, ticketSellingURL)
}

let success = []

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))

async function main() {
  try {
    await dbClient.$connect()
    const { items } = await insertKOPISEvents(1)
    await dbClient.$disconnect()
    await Promise.all(
      items.map(async (item, index) => {
        await sleep()
        await dbClient.$connect()
        await insertKOPISEventDetail(item.id)
        console.log(item.id, index)
        success.push(item.id)
        await dbClient.$disconnect()
      }),
    )
  } catch (e) {
    console.error(e)
  } finally {
    console.log(success)
  }
}

main()
