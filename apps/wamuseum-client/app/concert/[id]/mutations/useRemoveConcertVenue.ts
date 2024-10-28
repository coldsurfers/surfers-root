import { gql, useMutation } from '@apollo/client'
import { CommonMutationHookOptions } from '../../../../libs/types'
import { RemoveConcertVenueData, RemoveConcertVenueInput } from '../../../../src/__generated__/graphql'

const removeConcertVenueMutation = gql`
  mutation RemoveConcertVenue($input: RemoveConcertVenueInput!) {
    removeConcertVenue(input: $input) {
      ... on Venue {
        id
        name
        lat
        lng
        geohash
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export type UseRemoveConcertVenueDataT = {
  removeConcertVenue: RemoveConcertVenueData
}

export type UseRemoveConcertVenueInputT = {
  input: RemoveConcertVenueInput
}

const useRemoveConcertVenue = (
  options: CommonMutationHookOptions<UseRemoveConcertVenueDataT, UseRemoveConcertVenueInputT>,
) => useMutation<UseRemoveConcertVenueDataT, UseRemoveConcertVenueInputT>(removeConcertVenueMutation, options)

export default useRemoveConcertVenue
