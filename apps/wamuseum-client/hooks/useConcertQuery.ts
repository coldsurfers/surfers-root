import { QueryHookOptions, useQuery } from '@apollo/client'
import { CONCERT_QUERY } from '../gql/queries'
import { ConcertData } from '../src/__generated__/graphql'

export default function useConcertQuery(
  options: QueryHookOptions<
    { concert: ConcertData },
    {
      concertId: string
    }
  >
) {
  return useQuery<
    { concert: ConcertData },
    {
      concertId: string
    }
  >(CONCERT_QUERY, options)
}
