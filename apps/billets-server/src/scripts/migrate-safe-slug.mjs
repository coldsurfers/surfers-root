import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { generateSlug, getSafeSlug } from './generateSlug.mjs';

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

const replacements = [
  [/#/g, 'no'],
  [/&/g, 'and'],
  [/%/g, 'percent'],
];

function preprocess(title) {
  return replacements.reduce((acc, [regex, value]) => acc.replace(regex, value), title);
}

async function migrateSharpIncludeSlugs() {
  await dbClient.$connect();
  const eventsWithSharpSlug = await dbClient.concert.findMany({
    where: {
      slug: {
        contains: '#',
      },
    },
  });
  const promises = eventsWithSharpSlug.map(async (event) => {
    // @TODO: need to common modulize
    const slug = slugify(preprocess(`${event.title}`), {
      replacement: '-', // 공백을 "-"로 변환
      lower: true, // 소문자로 변환
      strict: false, // 특수 문자 제거
      remove: /[[\]*+~.()'"?!:@,<>〈〉]/g, // 특정 특수문자 제거
    });
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

async function resetSlugs() {
  await dbClient.$connect();
  const events = await dbClient.concert.findMany({
    where: {
      slug: {
        endsWith: '-1',
      },
    },
  });
  const promises = events.map(async (event) => {
    const slug = await getSafeSlug(event.title);
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
// resetSlugs();
// migrateSlugsForEvents();
// migrateSharpIncludeSlugs();
