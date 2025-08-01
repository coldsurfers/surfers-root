import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type { FetchGetSeriesItemSearchParams } from 'app/api/blog/series/[slug]/types';
import type { FetchGetSeriesSearchParams } from 'app/api/blog/series/types';
import { ALL_SERIES_CATEGORIES } from '../(constants)';
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
  listAll: (appLocale: AppLocale, tag?: string) => ({
    queryKey: ['series', 'listAll', { appLocale, tag }],
    queryFn: async () => {
      const promises = ALL_SERIES_CATEGORIES.map(async (seriesCategory) => {
        return await fetchGetSeries({
          seriesCategory,
          appLocale,
          tag,
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
  list: {
    queryKey: ['list'],
    queryFn: () => fetchGetTags(),
  },
});

export const queryKeyFactory = mergeQueryKeys(users, resume, series, tags);
