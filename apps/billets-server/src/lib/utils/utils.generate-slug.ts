import slugify from 'slugify';
import { dbClient } from '../db';

// Function to generate unique slugs
export async function generateSlug(title: string) {
  let slug = slugify(title, { lower: true, strict: true });

  // Check for existing slugs in the database
  let existing = await dbClient.concert.findUnique({
    where: {
      slug,
    },
  });

  // If slug already exists, append a number
  if (existing) {
    let counter = 1;
    let newSlug: string;
    do {
      newSlug = `${slug}-${counter}`;
      existing = await dbClient.concert.findUnique({ where: { slug: newSlug } });
      counter++;
    } while (existing);
    slug = newSlug;
  }

  return slug;
}
