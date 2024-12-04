import client from '@/lib/api/openapi-client'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'

const queryFn = async ({ artistId, offset, size }: { artistId: string; offset: number; size: number }) => {
  const response = await client.GET('/v1/artist/concert-list/{artistId}', {
    params: {
      path: {
        artistId,
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
  artistId: string
}
type TQueryKey = ReturnType<(typeof v1QueryKeyFactory)['concerts']['listByArtistId']>['queryKey']
type TPageParam = number

type Options = UseInfiniteQueryOptions<
  TQueryData,
  TError,
  InfiniteData<TQueryData, TQueryParams>,
  TQueryData,
  TQueryKey,
  TPageParam
>

export const useArtistConcertListQuery = (params: TQueryParams, options?: Partial<Options>) => {
  return useInfiniteQuery({
    ...options,
    queryFn: ({ pageParam = 0 }) =>
      queryFn({
        artistId: params.artistId,
        offset: pageParam,
        size: SIZE,
      }),
    initialPageParam: 0,
    queryKey: v1QueryKeyFactory.concerts.listByArtistId(params).queryKey,
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
