import { TypedUseQueryOptions } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../react-query.key-factory'

type Options = TypedUseQueryOptions<typeof queryKeyFactory.tags.list>

export const useGetTagsQuery = (options?: Options) => {
  return useQuery({
    ...options,
    ...queryKeyFactory.tags.list,
  })
}
