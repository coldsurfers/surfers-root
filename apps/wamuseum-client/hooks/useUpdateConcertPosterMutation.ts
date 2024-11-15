import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client'
import { UpdateConcertPosterData } from 'src/__generated__/graphql'
import { UpdateConcertPosterMutation } from '../gql/mutations'

type TData = {
  updateConcertPoster: UpdateConcertPosterData
}
type TVariables = {
  input: {
    id: string
    imageURL: string
  }
}
type Options = MutationHookOptions<TData, TVariables, DefaultContext, ApolloCache<unknown>>

export default function useUpdateConcertPosterMutation(options?: Options) {
  return useMutation<TData, TVariables>(UpdateConcertPosterMutation, options)
}
