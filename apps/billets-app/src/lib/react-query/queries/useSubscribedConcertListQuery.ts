import { fetchClient } from '@/lib/api/openapi-client'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { InfiniteData, useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query'

const DEFAULT_SIZE = 20

const queryFn = async (offset: number, size: number) => {
  const data = await fetchClient.GET('/v1/subscribe/concert', {
    params: {
      query: {
        offset: `${offset}`,
        size: `${size}`,
      },
    },
  })
  return data.data
}

type TQueryData = Awaited<ReturnType<typeof queryFn>>
type TError = Error
type TQueryParams = { offset: number; size: number }
type TQueryKey = (typeof v1QueryKeyFactory)['concerts']['subscribedList']['queryKey']
type TPageParam = number

type Options = Partial<
  UseSuspenseInfiniteQueryOptions<
    TQueryData,
    TError,
    InfiniteData<TQueryData, TQueryParams>,
    TQueryData,
    TQueryKey,
    TPageParam
  >
>

const useSubscribedConcertListQuery = (options?: Options) => {
  return useSuspenseInfiniteQuery({
    ...options,
    initialPageParam: 0,
    queryKey: v1QueryKeyFactory.concerts.subscribedList.queryKey,
    queryFn: async ({ pageParam = 0 }) => queryFn(pageParam, DEFAULT_SIZE),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined
      }
      if (lastPage.length < DEFAULT_SIZE) {
        return undefined
      }
      return allPages.length * DEFAULT_SIZE
    },
  })
}

export default useSubscribedConcertListQuery
