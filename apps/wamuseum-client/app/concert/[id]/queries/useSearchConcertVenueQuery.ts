import { gql, useQuery } from '@apollo/client'
import { CommonQueryHookOptions } from '../../../../libs/types'
import { SearchConcertVenueData } from '../../../../src/__generated__/graphql'

export const searchConcertVenueQuery = gql`
  query Query($keyword: String!) {
    searchConcertVenue(keyword: $keyword) {
      ... on SearchedConcertVenueList {
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

export type UseSearchConcertVenueQueryDataT = {
  searchConcertVenue: SearchConcertVenueData
}

export type UseSearchConcertVenueQueryInputT = {
  keyword: string
}

const useSearchConcertVenueQuery = (
  options: CommonQueryHookOptions<UseSearchConcertVenueQueryDataT, UseSearchConcertVenueQueryInputT>,
) => useQuery<UseSearchConcertVenueQueryDataT, UseSearchConcertVenueQueryInputT>(searchConcertVenueQuery, options)

export default useSearchConcertVenueQuery
