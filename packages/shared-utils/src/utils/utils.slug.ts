import slugify from 'slugify';

// Function to generate unique slugs
export async function generateSlug(
  title: string,
  existingCallback: (newSlug: string) => boolean | Promise<boolean>,
  options?: {
    lower: boolean;
    strict: boolean;
  }
) {
  let slug = slugify(title, { lower: options?.lower ?? true, strict: options?.strict ?? true });

  // Check for existing slugs in the database
  let existing = await existingCallback(slug);

  // // If slug already exists, append a number
  if (existing) {
    let counter = 1;
    let newSlug: string;
    do {
      newSlug = `${slug}-${counter}`;
      existing = await existingCallback(newSlug);
      counter++;
    } while (existing);
    slug = newSlug;
  }

  return slug;
}
