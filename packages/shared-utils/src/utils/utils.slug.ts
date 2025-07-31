import slugify from 'slugify';

export const getSafeSlug = (slug: string) => {
  return slugify(slug, {
    replacement: '-', // 공백을 "-"로 변환
    lower: true, // 소문자로 변환
    strict: false, // 특수 문자 제거
    remove: /[[\]*+~.()'"?!:@,&<>〈〉#]/g, // 특정 특수문자 제거
  });
};

// Function to generate unique slugs
export async function generateSlug(
  title: string,
  existingCallback: (newSlug: string) => boolean | Promise<boolean>
) {
  let slug = createSlug(title);

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

const replacements = [
  [/#/g, 'no'],
  [/&/g, 'and'],
  [/%/g, 'percent'],
] as const;

function preprocess(title: string) {
  return replacements.reduce((acc, [regex, value]) => acc.replace(regex, value), title);
}

export const createSlug = (valueToSlugify: string) => {
  const slug = slugify(preprocess(`${valueToSlugify}`), {
    replacement: '-', // 공백을 "-"로 변환
    lower: true, // 소문자로 변환
    strict: false, // 특수 문자 제거
    remove: /[[\]*+~.()'"?!:@,<>〈〉]/g, // 특정 특수문자 제거
  });
  return slug;
};
