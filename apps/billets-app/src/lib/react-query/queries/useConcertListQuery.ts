import { InfiniteData, UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { LatLng } from '../../../types/LatLng'
import { fetchClient } from '../../api/openapi-client'
import { v1QueryKeyFactory } from '../../query-key-factory'

const DEFAULT_SIZE = 20

const queryFn = async (offset: number, size: number, latLng: LatLng) => {
  const response = await fetchClient.GET('/v1/concert/', {
    params: {
      query: {
        offset: `${offset}`,
        size: `${size}`,
        latitude: `${latLng.latitude}`,
        longitude: `${latLng.longitude}`,
      },
    },
  })
  return response.data ?? []
}

type TQueryData = Awaited<ReturnType<typeof queryFn>>
type TError = Error
type TQueryParams = { latLng: LatLng }
type TQueryKey = ReturnType<(typeof v1QueryKeyFactory)['concerts']['list']>['queryKey']
type TPageParam = number

function useConcertListQuery(
  params: TQueryParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      TQueryData,
      TError,
      InfiniteData<TQueryData, TQueryParams>,
      TQueryData,
      TQueryKey,
      TPageParam
    >
  >,
) {
  return useInfiniteQuery<TQueryData, TError, InfiniteData<TQueryData, TQueryParams>, TQueryKey, TPageParam>({
    ...options,
    initialPageParam: 0,
    queryKey: v1QueryKeyFactory.concerts.list(params).queryKey,
    queryFn: ({ pageParam = 0 }) => queryFn(pageParam, DEFAULT_SIZE, params.latLng),
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

export default useConcertListQuery
