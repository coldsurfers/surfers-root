import { TypedUseQueryOptions } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../react-query.key-factory'

type Options = TypedUseQueryOptions<typeof queryKeyFactory.users.list>

export const useGetUsersQuery = (options?: Options) => {
  return useQuery({
    ...options,
    ...queryKeyFactory.users.list,
  })
}
