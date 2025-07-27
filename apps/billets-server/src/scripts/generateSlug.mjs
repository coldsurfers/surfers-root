import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

export function getSafeSlug(value) {
  const slug = slugify(value, {
    replacement: '-', // 공백을 "-"로 변환
    lower: true, // 소문자로 변환
    strict: false, // 특수 문자 제거
    remove: /[[\]*+~.()'"?!:@,&<>〈〉]/g, // 특정 특수문자 제거
  });
  return slug;
}

/**
 * generate slug for concert
 */
export async function generateSlug(title) {
  try {
    await dbClient.$connect();
    let slug = getSafeSlug(title);

    // Check for existing slugs in the database
    let existing = await dbClient.concert.findUnique({
      where: {
        slug,
      },
    });

    // If slug already exists, append a number
    if (existing) {
      let counter = 1;
      let newSlug;
      do {
        newSlug = `${slug}-${counter}`;
        existing = await dbClient.concert.findUnique({ where: { slug: newSlug } });
        counter++;
      } while (existing);
      slug = newSlug;
    }
    return slug;
  } catch (e) {
    console.error(e);
    return undefined;
  } finally {
    await dbClient.$disconnect();
  }
}

/**
 * generate slug for concert
 */
export async function generateSlugForVenue(title) {
  try {
    await dbClient.$connect();
    let slug = getSafeSlug(title);

    // Check for existing slugs in the database
    let existing = await dbClient.venue.findUnique({
      where: {
        slug,
      },
    });

    // If slug already exists, append a number
    if (existing) {
      let counter = 1;
      let newSlug;
      do {
        newSlug = `${slug}-${counter}`;
        existing = await dbClient.venue.findUnique({ where: { slug: newSlug } });
        counter++;
      } while (existing);
      slug = newSlug;
    }
    return slug;
  } catch (e) {
    console.error(e);
    return undefined;
  } finally {
    await dbClient.$disconnect();
  }
}
