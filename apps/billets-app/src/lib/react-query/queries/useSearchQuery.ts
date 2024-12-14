import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { fetchClient } from '../../api/openapi-client'
import { v1QueryKeyFactory } from '../../query-key-factory'

const queryFn = async (params: TQueryParams) => {
  const response = await fetchClient.GET('/v1/search/', {
    params: {
      query: {
        keyword: params.keyword,
      },
    },
  })
  return response.data ?? []
}

type TQueryParams = { keyword: string }
type TError = Error
type TQueryFnData = Awaited<ReturnType<typeof queryFn>>
type TQueryKey = ReturnType<(typeof v1QueryKeyFactory)['search']['list']>['queryKey']

export default function useSearchQuery(
  params: TQueryParams,
  options?: Partial<UseQueryOptions<TQueryFnData, TError, TQueryFnData, TQueryKey>>,
) {
  return useQuery<TQueryFnData, TError, TQueryFnData, TQueryKey>({
    queryFn: () => queryFn(params),
    queryKey: v1QueryKeyFactory.search.list(params).queryKey,
    ...options,
  })
}
