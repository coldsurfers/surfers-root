import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client'
import { CreateConcertPosterMutation } from '../gql/mutations'
import { CreateConcertPosterData, CreateConcertPosterInput } from '../src/__generated__/graphql'

export default function useCreateConcertPosterMutation(
  options?: MutationHookOptions<
    { createConcertPoster: CreateConcertPosterData },
    { input: CreateConcertPosterInput },
    DefaultContext,
    ApolloCache<any>
  >,
) {
  return useMutation<
    {
      createConcertPoster: CreateConcertPosterData
    },
    {
      input: CreateConcertPosterInput
    }
  >(CreateConcertPosterMutation, options)
}
