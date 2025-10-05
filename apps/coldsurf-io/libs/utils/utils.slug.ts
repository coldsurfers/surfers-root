export const generateSlugHref = (slug: string | null) => {
  const href = slug ? `/event/${encodeURIComponent(slug)}` : '#';
  return href;
};
