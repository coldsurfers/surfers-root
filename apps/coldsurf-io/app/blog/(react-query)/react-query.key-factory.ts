import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type { FetchGetSeriesItemSearchParams } from 'app/api/blog/series/[slug]/types';
import type { FetchGetSeriesSearchParams } from 'app/api/blog/series/types';
import { ALL_SERIES_CATEGORIES, ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG } from '../(constants)';
import {
  fetchGetResume,
  fetchGetSeries,
  fetchGetSeriesItem,
  fetchGetTags,
  fetchGetUsers,
} from '../(fetchers)';
import type { AppLocale } from '../(types)/i18n';

const series = createQueryKeys('series', {
  all: ['series'],
  listAll: (appLocale: AppLocale, tag?: string, isOfficialBlog?: boolean) => ({
    queryKey: ['series', 'listAll', { appLocale, tag }],
    queryFn: async () => {
      const promises = isOfficialBlog
        ? ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG.map(async (seriesCategory) => {
            return await fetchGetSeries({
              seriesCategory,
              appLocale,
              tag,
              isOfficialBlog: true,
            });
          })
        : ALL_SERIES_CATEGORIES.map(async (seriesCategory) => {
            return await fetchGetSeries({
              seriesCategory,
              appLocale,
              tag,
              isOfficialBlog: false,
            });
          });
      const response = await Promise.all(promises);
      return response;
    },
  }),
  list: (params: FetchGetSeriesSearchParams) => ({
    queryKey: ['series', 'list', params],
    queryFn: () => fetchGetSeries(params),
  }),
  item: (slug: string, searchParams: FetchGetSeriesItemSearchParams) => ({
    queryKey: ['series', 'detail', { slug, ...searchParams }],
    queryFn: () => fetchGetSeriesItem(slug, searchParams),
  }),
});

const users = createQueryKeys('users', {
  all: null,
  list: {
    queryKey: ['list'],
    queryFn: () => fetchGetUsers(),
  },
});

const resume = createQueryKeys('resumes', {
  all: null,
  detail: (filters: { locale: AppLocale }) => ({
    queryKey: ['detail', { filters }],
    queryFn: () => fetchGetResume(filters),
  }),
});

const tags = createQueryKeys('tags', {
  all: null,
  list: (isOfficialBlog: boolean) => ({
    queryKey: ['list', { isOfficialBlog }],
    queryFn: () => fetchGetTags({ isOfficialBlog }),
  }),
});

export const queryKeyFactory = mergeQueryKeys(users, resume, series, tags);
