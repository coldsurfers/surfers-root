import { PrismaClient } from '@prisma/client'
import { generateSlug } from './generateSlug.mjs'

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
})

async function main() {
  await dbClient.$connect()
  const events = await dbClient.concert.findMany({
    where: {
      slug: null,
    },
  })
  const promises = events.map(async (event) => {
    const slug = await generateSlug(event.title)
    try {
      await dbClient.concert.update({
        where: {
          id: event.id,
        },
        data: {
          slug,
        },
      })
    } catch (e) {
      console.error('already existing slug', slug, event.id)
    }
  })
  await Promise.allSettled(promises)
  await dbClient.$disconnect()
}

main()
