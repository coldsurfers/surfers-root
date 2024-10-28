import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  useMutation,
} from '@apollo/client'
import { UpdateConcertData, UpdateConcertInput } from '../gql/schema'
import { UPDATE_CONCERT_POSTER_MUTATION } from '../gql/mutations'

export default function useUpdateConcertMutation(
  options?: MutationHookOptions<
    { updateConcert: UpdateConcertData },
    {
      input: UpdateConcertInput
    },
    DefaultContext,
    ApolloCache<any>
  >
) {
  return useMutation<
    {
      updateConcert: UpdateConcertData
    },
    {
      input: UpdateConcertInput
    }
  >(UPDATE_CONCERT_POSTER_MUTATION, options)
}
