import { PrismaClient } from '@prisma/client';
import { generateSlug, generateSlugForVenue } from './generateSlug.mjs';

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

async function updateSlugForConcerts() {
  await dbClient.$connect();
  const events = await dbClient.concert.findMany({
    where: {
      slug: null,
    },
  });
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

async function updateSlugForVenues() {
  await dbClient.$connect();
  const venues = await dbClient.venue.findMany({
    where: {
      slug: null,
    },
  });
  const promises = venues.map(async (venue) => {
    const slug = await generateSlugForVenue(venue.name);
    try {
      await dbClient.venue.update({
        where: {
          id: venue.id,
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

updateSlugForVenues();
