import { match } from 'ts-pattern';
import type { OfficialBlogSeriesCategory, SeriesCategory } from '../(types)/series';

export const generateSeriesHref = ({
  seriesCategory,
  query,
  isOfficialBlog,
}: {
  seriesCategory?: SeriesCategory | OfficialBlogSeriesCategory;
  query?: { page: number };
  isOfficialBlog?: boolean;
}): string => {
  let url = '';
  if (!seriesCategory) {
    url = isOfficialBlog ? '/official-blog' : '/blog';
  } else {
    url = isOfficialBlog ? `/official-blog/${seriesCategory}` : `/blog/${seriesCategory}`;
  }

  if (query?.page) {
    return `${url}/page/${query.page}`;
  }

  return url;
};

export const generateSeriesItemHref = (
  seriesCategory: SeriesCategory | OfficialBlogSeriesCategory,
  slug: string,
  isOfficialBlog?: boolean
) => {
  return {
    pathname: isOfficialBlog
      ? `/official-blog/${seriesCategory}/${slug}`
      : `/blog/${seriesCategory}/${slug}`,
    params: {
      series: seriesCategory,
      slug,
    },
  };
};

export const convertSeriesCategoryToTitle = (
  seriesCategory: SeriesCategory | OfficialBlogSeriesCategory
) => {
  return match(seriesCategory)
    .with('catholic', () => 'YOU MUST PRAY THIS')
    .with('sound', () => 'YOU MUST LISTEN THIS')
    .with('tech', () => 'YOU MUST CODE THIS')
    .with('text', () => 'YOU MUST READ THIS')
    .with('video', () => 'YOU MUST WATCH THIS')
    .with('news', () => 'COLDSURF BLOG: NEWS')
    .exhaustive();
};
