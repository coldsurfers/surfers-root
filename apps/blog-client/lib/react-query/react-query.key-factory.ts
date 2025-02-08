import { FetchGetSeriesItemSearchParams } from '@/app/api/series/[slug]/types'
import { FetchGetSeriesSearchParams } from '@/app/api/series/types'
import { LogPlatform } from '@/features'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { ALL_SERIES_CATEGORIES } from '../constants'
import {
  fetchGetLogDetail,
  fetchGetLogs,
  fetchGetResume,
  fetchGetSeries,
  fetchGetSeriesItem,
  fetchGetTags,
  fetchGetUsers,
} from '../fetchers'
import { AppLocale } from '../types/i18n'

const series = createQueryKeys('series', {
  all: ['series'],
  listAll: (appLocale: AppLocale, tag?: string) => ({
    queryKey: ['series', 'listAll', { appLocale, tag }],
    queryFn: async (ctx) => {
      const promises = ALL_SERIES_CATEGORIES.map(async (seriesCategory) => {
        return await fetchGetSeries({
          seriesCategory,
          appLocale,
          tag,
        })
      })
      const response = await Promise.all(promises)
      return response
    },
  }),
  list: (params: FetchGetSeriesSearchParams) => ({
    queryKey: ['series', 'list', params],
    queryFn: (ctx) => fetchGetSeries(params),
  }),
  item: (slug: string, searchParams: FetchGetSeriesItemSearchParams) => ({
    queryKey: ['series', 'detail', { slug, ...searchParams }],
    queryFn: (ctx) => fetchGetSeriesItem(slug, searchParams),
  }),
})

const logs = createQueryKeys('logs', {
  all: null,
  list: (filters: { platform: LogPlatform; locale: AppLocale; tag?: string }) => ({
    queryKey: [{ filters }],
    queryFn: (ctx) => fetchGetLogs(filters),
  }),
  detail: (slug: string, filters: { platform: LogPlatform; locale: AppLocale }) => ({
    queryKey: [
      slug,
      {
        filters,
      },
    ],
    queryFn: (ctx) => fetchGetLogDetail(slug, filters),
  }),
})

const users = createQueryKeys('users', {
  all: null,
  list: {
    queryKey: ['list'],
    queryFn: (ctx) => fetchGetUsers(),
  },
})

const resume = createQueryKeys('resumes', {
  all: null,
  detail: (filters: { locale: AppLocale }) => ({
    queryKey: ['detail', { filters }],
    queryFn: (ctx) => fetchGetResume(filters),
  }),
})

const tags = createQueryKeys('tags', {
  all: null,
  list: {
    queryKey: ['list'],
    queryFn: () => fetchGetTags(),
  },
})

export const queryKeyFactory = mergeQueryKeys(logs, users, resume, series, tags)
