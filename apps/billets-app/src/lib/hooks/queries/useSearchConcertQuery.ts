import {
  InfiniteData,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import client from '../../api/openapi-client';
import {v1QueryKeyFactory} from '../../query-key-factory';

const DEFAULT_SIZE = 20;

const queryFn = async (offset: number, size: number, keyword: string) => {
  const response = await client.GET('/v1/concert/search', {
    params: {
      query: {
        offset: `${offset}`,
        size: `${size}`,
        keyword,
      },
    },
  });
  return response.data ?? [];
};

type TQueryData = Awaited<ReturnType<typeof queryFn>>;
type TError = Error;
type TQueryParams = {keyword: string};
type TQueryKey = ReturnType<
  (typeof v1QueryKeyFactory)['concerts']['searchList']
>['queryKey'];
type TPageParam = number;

function useSearchConcertQuery(
  {keyword}: TQueryParams,
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
  return useInfiniteQuery<
    TQueryData,
    TError,
    InfiniteData<TQueryData, TQueryParams>,
    TQueryKey,
    TPageParam
  >({
    ...options,
    initialPageParam: 0,
    queryKey: v1QueryKeyFactory.concerts.searchList({keyword}).queryKey,
    queryFn: ({pageParam = 0}) => queryFn(pageParam, DEFAULT_SIZE, keyword),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined;
      }
      if (lastPage.length < DEFAULT_SIZE) {
        return undefined;
      }
      return allPages.length * DEFAULT_SIZE;
    },
  });
}

export default useSearchConcertQuery;
