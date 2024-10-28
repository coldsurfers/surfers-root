import { gql, useQuery } from '@apollo/client'
import { CommonQueryHookOptions } from '../../../../libs/types'
import { ConcertVenueData } from '../../../../src/__generated__/graphql'

export const concertVenuesQuery = gql`
  query ConcertVenues($concertId: String!) {
    concertVenues(concertId: $concertId) {
      ... on ConcertVenueList {
        list {
          id
          name
          lat
          lng
          geohash
        }
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export type UseConcertVenuesDataT = {
  concertVenues: ConcertVenueData
}

export type UseConcertVenuesInputT = {
  concertId: string
}

const useConcertVenues = (options: CommonQueryHookOptions<UseConcertVenuesDataT, UseConcertVenuesInputT>) =>
  useQuery<UseConcertVenuesDataT, UseConcertVenuesInputT>(concertVenuesQuery, options)

export default useConcertVenues
