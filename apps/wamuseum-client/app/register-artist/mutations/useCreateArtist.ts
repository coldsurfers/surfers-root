import { gql, useMutation } from '@apollo/client'
import { CreateArtistData, CreateArtistInput } from '../../../src/__generated__/graphql'
import { CommonMutationHookOptions } from '../../../libs/types'

const createArtistMutation = gql`
  mutation CreateArtist($input: CreateArtistInput!) {
    createArtist(input: $input) {
      ... on Artist {
        id
        name
      }
    }
  }
`

const useCreateArtist = (
  options: CommonMutationHookOptions<
    {
      createArtist: CreateArtistData
    },
    {
      input: CreateArtistInput
    }
  >,
) =>
  useMutation<
    {
      createArtist: CreateArtistData
    },
    {
      input: CreateArtistInput
    }
  >(createArtistMutation, options)

export default useCreateArtist
