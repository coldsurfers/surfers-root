import { QueryHookOptions, useQuery } from '@apollo/client'
import { CONCERT_LIST_QUERY } from '../gql/queries'
import { ConcertListData } from '../src/__generated__/graphql'

export default function useConcertListQuery(
  options?: QueryHookOptions<
    { concertList: ConcertListData },
    {
      page: number
      limit: number
      orderBy: {
        createdAt: 'asc' | 'desc'
      }
    }
  >
) {
  return useQuery<
    {
      concertList: ConcertListData
    },
    {
      page: number
      limit: number
      orderBy: {
        createdAt: 'asc' | 'desc'
      }
    }
  >(CONCERT_LIST_QUERY, options)
}
