import { db } from './db';

async function main() {
  await db.$connect();

  const allVenues = await db.venue.findMany({});

  const migrationPromises = allVenues.map(async (venue) => {
    await db.venue.update({
      where: {
        id: venue.id,
      },
      data: {
        slug: null,
      },
    });
  });

  await Promise.allSettled(migrationPromises);

  await db.$disconnect();
}

main();
