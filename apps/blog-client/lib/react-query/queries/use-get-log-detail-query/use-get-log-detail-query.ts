import { LogPlatform } from '@/features'
import { AppLocale } from '@/lib/types/i18n'
import { TypedUseQueryOptions } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../react-query.key-factory'

type Options = Partial<TypedUseQueryOptions<typeof queryKeyFactory.logs.detail>>

export const useGetLogDetailQuery = (
  slug: string,
  filters: { platform: LogPlatform; locale: AppLocale },
  options?: Options,
) => {
  return useQuery({
    ...options,
    ...queryKeyFactory.logs.detail(slug, filters),
  })
}
