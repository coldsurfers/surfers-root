import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

async function main() {
  await dbClient.$connect();

  const allVenues = await dbClient.venue.findMany({});

  const migrationPromises = allVenues.map(async (venue) => {
    await dbClient.venue.update({
      where: {
        id: venue.id,
      },
      data: {
        slug: null,
      },
    });
  });

  await Promise.allSettled(migrationPromises);

  await dbClient.$disconnect();
}

main();
