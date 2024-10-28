import { gql, useMutation } from '@apollo/client'
import { CommonMutationHookOptions } from '../../../../libs/types'
import { CreateConcertArtistData, CreateConcertArtistInput } from '../../../../src/__generated__/graphql'

const createConcertArtistMutation = gql`
  mutation CreateConcertArtist($input: CreateConcertArtistInput!) {
    createConcertArtist(input: $input) {
      ... on Artist {
        id
        name
      }
    }
  }
`

type DataT = {
  createConcertArtist: CreateConcertArtistData
}

type InputT = {
  input: CreateConcertArtistInput
}

const useCreateConcertArtist = (options: CommonMutationHookOptions<DataT, InputT>) =>
  useMutation<DataT, InputT>(createConcertArtistMutation, options)

export default useCreateConcertArtist
