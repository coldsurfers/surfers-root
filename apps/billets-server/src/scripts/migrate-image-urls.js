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
