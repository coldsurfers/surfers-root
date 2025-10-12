import type { OfficialBlogSeriesCategory, SeriesCategory } from '../(types)/series';

export const ALL_SERIES_CATEGORIES: SeriesCategory[] = [
  'catholic',
  'sound',
  'tech',
  'text',
  'video',
];

// @TODO: 응집도 with blog/(types)/series.ts
export const ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG: OfficialBlogSeriesCategory[] = [
  'news',
  'culture',
];

export const PAGINATION_PER_LINE = 3;
export const PAGINATION_PER_PAGE = 9;

export const TEMP_FIXED_APP_LOCALE = 'ko';
