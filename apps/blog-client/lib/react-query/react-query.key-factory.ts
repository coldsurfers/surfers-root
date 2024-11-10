import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { AppLocale } from 'i18n/types'
import { fetchGetLogs } from '../fetchers'

const logs = createQueryKeys('logs', {
  all: null,
  list: (filters: { platform: 'techlog' | 'surflog'; locale: AppLocale }) => ({
    queryKey: [{ filters }],
    queryFn: (ctx) => fetchGetLogs(filters),
  }),
})

export const queryKeyFactory = mergeQueryKeys(logs)
