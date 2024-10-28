import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  useMutation,
} from '@apollo/client'
import { CreateConcertMutation } from '../gql/mutations'
import {
  CreateConcertData,
  CreateConcertInput,
} from '../src/__generated__/graphql'

export default function useCreateConcertMutation(
  options?: MutationHookOptions<
    { createConcert: CreateConcertData },
    {
      input: CreateConcertInput
    },
    DefaultContext,
    ApolloCache<any>
  >
) {
  return useMutation<
    {
      createConcert: CreateConcertData
    },
    {
      input: CreateConcertInput
    }
  >(CreateConcertMutation, options)
}
