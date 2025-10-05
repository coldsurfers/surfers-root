import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

// Get __filename equivalent
const __filename = fileURLToPath(import.meta.url);

// Get __dirname equivalent
const __dirname = dirname(__filename);

const idToSlugJsonPath = path.resolve(__dirname, '../../../coldsurf-io/id-to-slug.json');

async function generateIdToSlug() {
  await dbClient.$connect();
  const events = await dbClient.concert.findMany({
    where: {
      slug: {
        not: null,
      },
    },
  });

  const idToSlug = {};

  for (const event of events) {
    const slug = event.slug;
    const id = event.id;
    idToSlug[id] = slug;
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
