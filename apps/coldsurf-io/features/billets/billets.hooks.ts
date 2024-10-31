import { useQuery } from '@tanstack/react-query'
import client from '../../libs/open-api-client'

export const useGetBilletsConcertQuery = () =>
  useQuery({
    queryKey: ['billets-concert'],
    queryFn: () =>
      client.GET('/v1/concert/', {
        params: {
          query: {
            offset: '0',
            size: '10',
          },
        },
      }),
  })
