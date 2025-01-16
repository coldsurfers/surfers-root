/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
})

async function migrate() {
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

migrate()
