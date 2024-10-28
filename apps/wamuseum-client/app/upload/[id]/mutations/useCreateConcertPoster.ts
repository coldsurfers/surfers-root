import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client'
import { CreateConcertPosterMutation } from '../../../../gql/mutations'
import { CreateConcertPosterData, CreateConcertPosterInput } from '../../../../src/__generated__/graphql'

const useCreateConcertPoster = (
  options?: MutationHookOptions<
    {
      createConcertPoster: CreateConcertPosterData
    },
    {
      input: CreateConcertPosterInput
    },
    DefaultContext,
    ApolloCache<unknown>
  >,
) =>
  useMutation<
    {
      createConcertPoster: CreateConcertPosterData
    },
    {
      input: CreateConcertPosterInput
    }
  >(CreateConcertPosterMutation, options)

export default useCreateConcertPoster
