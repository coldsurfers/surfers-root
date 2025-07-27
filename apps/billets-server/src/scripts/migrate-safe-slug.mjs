import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

async function migrateSlugsForEvents() {
  await dbClient.$connect();
  const events = await dbClient.concert.findMany({});
  const promises = events.map(async (event) => {
    const slug = await generateSlug(event.title);
    try {
      await dbClient.concert.update({
        where: {
          id: event.id,
        },
        data: {
          slug,
        },
      });
    } catch (e) {
      console.error('already existing slug', slug, event.id, e);
    }
  });
  await Promise.allSettled(promises);
  await dbClient.$disconnect();
}

migrateSlugsForEvents();
