import { TypedUseQueryOptions } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import { AppLocale } from 'i18n/types'
import { queryKeyFactory } from '../../react-query.key-factory'

type Options = Partial<TypedUseQueryOptions<typeof queryKeyFactory.logs.detail>>

export const useGetLogDetailQuery = (
  slug: string,
  filters: { platform: 'techlog' | 'surflog'; locale: AppLocale },
  options?: Options,
) => {
  return useQuery({
    ...options,
    ...queryKeyFactory.logs.detail(slug, filters),
  })
}
