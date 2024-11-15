import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client'
import { CreateConcertPosterMutation } from '../gql/mutations'
import { CreateConcertPosterData, CreateConcertPosterInput } from '../src/__generated__/graphql'

type TData = {
  createConcertPoster: CreateConcertPosterData
}
type TVariables = {
  input: CreateConcertPosterInput
}
type Options = MutationHookOptions<TData, TVariables, DefaultContext, ApolloCache<unknown>>

export default function useCreateConcertPosterMutation(options?: Options) {
  return useMutation<TData, TVariables>(CreateConcertPosterMutation, options)
}
