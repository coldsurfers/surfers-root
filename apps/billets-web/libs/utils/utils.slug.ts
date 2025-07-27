import slugify from 'slugify';

export const generateSafeSlug = (slug: string) => {
  return slugify(slug, {
    replacement: '-', // 공백을 "-"로 변환
    lower: true, // 소문자로 변환
    strict: false, // 특수 문자 제거
    remove: /[[\]*+~.()'"?!:@,&<>〈〉]/g, // 특정 특수문자 제거
  });
};

export const generateSlugHref = (slug: string | null) => {
  const href = slug ? `/event/${encodeURIComponent(generateSafeSlug(slug))}` : '#';
  return href;
};
