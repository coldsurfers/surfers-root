import { generateSlug } from '@coldsurfers/shared-utils';
import { db } from './db';
import { runSequentially } from './utils';

async function main() {
  await db.$connect();

  const emptySlugVenues = await db.venue.findMany({
    where: {
      slug: null,
    },
  });

  const dbPromisesCallbacks = emptySlugVenues.map((venue) => {
    return async () => {
      const slug = await generateSlug(venue.name, async (newSlug) => {
        const venue = await db.venue.findUnique({
          where: {
            slug: newSlug,
          },
        });
        return !!venue;
      });
      await db.venue.update({
        where: {
          id: venue.id,
        },
        data: {
          slug,
        },
      });
    };
  });

  await runSequentially(dbPromisesCallbacks);

  await db.$disconnect();
}

main();
