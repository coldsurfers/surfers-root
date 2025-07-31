import { generateSlug } from '@coldsurfers/shared-utils';
import { db } from './db';

function runSequentially(tasks: (() => Promise<any>)[]) {
  return tasks.reduce((prevPromise, task) => {
    return prevPromise.then(() => task().then(console.log));
  }, Promise.resolve());
}

/**
 * !!WARNING: update all
 */
async function main() {
  await db.$connect();

  const allVenues = await db.venue.findMany({});

  const dbPromisesCallbacks = allVenues.map((venue) => {
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
