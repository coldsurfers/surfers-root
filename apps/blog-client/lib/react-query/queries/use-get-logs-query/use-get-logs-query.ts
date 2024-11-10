import { TypedUseQueryOptions } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import { AppLocale } from 'i18n/types'
import { queryKeyFactory } from '../../react-query.key-factory'

type Options = Partial<TypedUseQueryOptions<typeof queryKeyFactory.logs.list>>

export const useGetLogsQuery = (
  { platform, locale }: { platform: 'techlog' | 'surflog'; locale: AppLocale },
  options?: Options,
) => {
  return useQuery({
    ...options,
    ...queryKeyFactory.logs.list({
      platform,
      locale,
    }),
  })
}
