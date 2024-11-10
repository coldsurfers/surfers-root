import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { AppLocale } from 'i18n/types'
import { fetchGetLogDetail, fetchGetLogs } from '../fetchers'

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

export const queryKeyFactory = mergeQueryKeys(logs)
