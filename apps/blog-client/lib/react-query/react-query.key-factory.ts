import { FetchGetSeriesSearchParams } from '@/app/api/series/types'
import { LogPlatform } from '@/features'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { ALL_SERIES } from '../constants'
import {
  fetchGetLogDetail,
  fetchGetLogs,
  fetchGetResume,
  fetchGetSeries,
  fetchGetTags,
  fetchGetUsers,
} from '../fetchers'
import { AppLocale } from '../types/i18n'

const series = createQueryKeys('series', {
  all: ['series'],
  listAll: (appLocale: AppLocale) => ({
    queryKey: ['series', 'listAll'],
    queryFn: async (ctx) => {
      const promises = ALL_SERIES.map(async (series) => {
        return await fetchGetSeries({
          series,
          appLocale,
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
