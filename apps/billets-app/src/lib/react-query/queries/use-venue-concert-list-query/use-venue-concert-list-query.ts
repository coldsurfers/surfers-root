import { fetchClient } from '@/lib/api/openapi-client'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'

const queryFn = async ({ venueId, offset, size }: { venueId: string; offset: number; size: number }) => {
  const response = await fetchClient.GET('/v1/venue/concert-list/{venueId}', {
    params: {
      path: {
        venueId,
      },
      query: {
        offset: `${offset}`,
        size: `${size}`,
      },
    },
  })
  return response.data ?? []
}

const SIZE = 20

type TQueryData = Awaited<ReturnType<typeof queryFn>>
type TError = Error
type TQueryParams = {
  venueId: string
}
type TQueryKey = ReturnType<(typeof v1QueryKeyFactory)['concerts']['listByVenueId']>['queryKey']
type TPageParam = number

type Options = UseInfiniteQueryOptions<
  TQueryData,
  TError,
  InfiniteData<TQueryData, TQueryParams>,
  TQueryData,
  TQueryKey,
  TPageParam
>

export const useVenueConcertListQuery = (params: TQueryParams, options?: Partial<Options>) => {
  return useInfiniteQuery({
    ...options,
    queryFn: ({ pageParam = 0 }) =>
      queryFn({
        venueId: params.venueId,
        offset: pageParam,
        size: SIZE,
      }),
    initialPageParam: 0,
    queryKey: v1QueryKeyFactory.concerts.listByVenueId(params).queryKey,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined
      }
      if (lastPage.length < SIZE) {
        return undefined
      }
      return allPages.length * SIZE
    },
  })
}
