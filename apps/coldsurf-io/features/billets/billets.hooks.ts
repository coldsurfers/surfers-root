import { queryKeys } from '@/libs/query-key-factory/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import client from '../../libs/open-api-client'

export const useGetBilletsConcertQueryFn = () =>
  client.GET('/v1/concert/', {
    params: {
      query: {
        offset: '0',
        size: '10',
      },
    },
  })

export const useGetBilletsConcertQuery = () =>
  useQuery({
    queryKey: queryKeys.billets.concerts.queryKey,
    queryFn: useGetBilletsConcertQueryFn,
  })
