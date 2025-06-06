/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
})

async function migratePosters() {
  const allPosters = await dbClient.poster.findMany()

  for (const poster of allPosters) {
    const { imageURL } = poster
    await dbClient.poster.update({
      where: {
        id: poster.id,
      },
      data: {
        imageURL: imageURL.split('&width=')[0],
      },
    })
  }
}

// migratePosters()

async function migrateArtistProfileImages() {
  const allArtistProfileImages = await dbClient.artistProfileImage.findMany()

  for (const artistProfileImage of allArtistProfileImages) {
    const { imageURL } = artistProfileImage
    const [_, key] = imageURL.split('https://abyss.coldsurf.io/')
    await dbClient.artistProfileImage.update({
      where: {
        id: artistProfileImage.id,
      },
      data: {
        imageURL: `https://api.billets.coldsurf.io/v1/image?key=${key}`,
      },
    })
  }
}

// migrateArtistProfileImages()

async function migratePostersKeyId() {
  const allPosters = await dbClient.poster.findMany()

  const concurrency = 10
  let index = 0
  async function processBatch() {
    const batch = allPosters.slice(index, index + concurrency)
    index += concurrency
    await Promise.all(
      batch.map(async (poster) => {
        const { imageURL } = poster
        const [_, key] = imageURL.split('https://api.billets.coldsurf.io/v1/image?key=')
        await dbClient.poster.update({
          where: { id: poster.id },
          data: { keyId: key },
        })
      }),
    )
  }
  while (index < allPosters.length) {
    await processBatch()
  }
}

// migratePostersKeyId()

async function migrateDetailImages() {
  const allDetailImages = await dbClient.detailImage.findMany()

  const concurrency = 10
  let index = 0
  async function processBatch() {
    const batch = allDetailImages.slice(index, index + concurrency)
    index += concurrency
    await Promise.all(
      batch.map(async (detailImage) => {
        const { imageURL } = detailImage
        const [_, key] = imageURL.split('https://api.billets.coldsurf.io/v1/image?key=')
        await dbClient.detailImage.update({
          where: { id: detailImage.id },
          data: { keyId: key },
        })
      }),
    )
  }
  while (index < allDetailImages.length) {
    await processBatch()
  }
}

// migrateDetailImages()
