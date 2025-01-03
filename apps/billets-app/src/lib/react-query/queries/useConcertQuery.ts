import { UseSuspenseQueryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchClient } from '../../api/openapi-client'
import { v1QueryKeyFactory } from '../../query-key-factory'

const queryFn = async (variables: { concertId: string }) => {
  const response = await fetchClient.GET('/v1/concert/{id}', {
    params: {
      path: {
        id: variables.concertId,
      },
    },
  })
  return response.data
}

type TQueryFnData = Awaited<ReturnType<typeof queryFn>>
type TError = Error
type TData = TQueryFnData
type TQueryKey = ReturnType<(typeof v1QueryKeyFactory)['concerts']['detail']>['queryKey']

function useConcertQuery(
  variables: { concertId: string },
  options?: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) {
  return useSuspenseQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...options,
    queryFn: () => queryFn(variables),
    queryKey: v1QueryKeyFactory.concerts.detail(variables).queryKey,
  })
}

export default useConcertQuery
