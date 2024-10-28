import { gql, useMutation } from '@apollo/client'
import { CommonMutationHookOptions } from '../../../../libs/types'
import { RemoveConcertArtistData, RemoveConcertArtistInput } from '../../../../src/__generated__/graphql'

const removeConcertArtistMutation = gql`
  mutation RemoveConcertArtist($input: RemoveConcertArtistInput!) {
    removeConcertArtist(input: $input) {
      ... on Artist {
        id
      }
    }
  }
`

type DataT = {
  removeConcertArtist: RemoveConcertArtistData
}

type InputT = {
  input: RemoveConcertArtistInput
}

const useRemoveConcertArtist = (options: CommonMutationHookOptions<DataT, InputT>) =>
  useMutation<DataT, InputT>(removeConcertArtistMutation, options)

export default useRemoveConcertArtist
