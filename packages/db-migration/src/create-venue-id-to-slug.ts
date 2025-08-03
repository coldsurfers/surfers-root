import fs from 'node:fs';
import path from 'node:path';
import { db } from './db';

const idToSlugJsonPath = path.resolve(__dirname, '../../../apps/billets-web/venue-id-to-slug.json');

async function generateIdToSlug() {
  await db.$connect();
  const venues = await db.venue.findMany({
    where: {
      slug: {
        not: null,
      },
    },
  });

  const idToSlug: Record<string, string> = {};

  for (const venue of venues) {
    const slug = venue.slug;
    const id = venue.id;
    if (id && slug) {
      idToSlug[id] = slug;
    }
  }
  fs.writeFileSync(
    idToSlugJsonPath,
    JSON.stringify(
      {
        ...idToSlug,
      },
      null,
      2
    )
  );
}

generateIdToSlug();
