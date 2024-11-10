import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { AppLocale } from 'i18n/types'
import { fetchGetLogDetail, fetchGetLogs, fetchGetResume, fetchGetUsers } from '../fetchers'

const logs = createQueryKeys('logs', {
  all: null,
  list: (filters: { platform: 'techlog' | 'surflog'; locale: AppLocale }) => ({
    queryKey: [{ filters }],
    queryFn: (ctx) => fetchGetLogs(filters),
  }),
  detail: (slug: string, filters: { platform: 'techlog' | 'surflog'; locale: AppLocale }) => ({
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

export const queryKeyFactory = mergeQueryKeys(logs, users, resume)