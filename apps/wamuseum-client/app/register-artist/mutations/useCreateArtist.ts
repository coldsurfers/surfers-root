import { ApolloCache, DefaultContext, gql, MutationHookOptions, useMutation } from '@apollo/client'
import { CreateArtistData, CreateArtistInput } from '../../../src/__generated__/graphql'

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

type TData = {
  createArtist: CreateArtistData
}
type TVariables = {
  input: CreateArtistInput
}
type Options = MutationHookOptions<TData, TVariables, DefaultContext, ApolloCache<unknown>>

const useCreateArtist = (options?: Options) => useMutation<TData, TVariables>(createArtistMutation, options)

export default useCreateArtist
