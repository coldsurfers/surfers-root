import { gql, useMutation } from '@apollo/client'
import { CommonMutationHookOptions } from '../../../../libs/types'
import { CreateConcertVenueData, CreateConcertVenueInput } from '../../../../src/__generated__/graphql'

export const createConcertVenueMutation = gql`
  mutation CreateConcertVenue($input: CreateConcertVenueInput!) {
    createConcertVenue(input: $input) {
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

export type UseCreateConcertVenueDataT = {
  createConcertVenue: CreateConcertVenueData
}

export type UseCreateConcertVenueInputT = {
  input: CreateConcertVenueInput
}

const useCreateConcertVenue = (
  options: CommonMutationHookOptions<UseCreateConcertVenueDataT, UseCreateConcertVenueInputT>,
) => useMutation<UseCreateConcertVenueDataT, UseCreateConcertVenueInputT>(createConcertVenueMutation, options)

export default useCreateConcertVenue
