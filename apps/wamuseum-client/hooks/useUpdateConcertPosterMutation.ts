import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client'
import { UpdateConcertPosterMutation } from '../gql/mutations'
import { UpdateConcertPosterData } from '../gql/schema'

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
