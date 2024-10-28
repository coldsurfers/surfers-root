import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  useMutation,
} from '@apollo/client'
import { RemoveConcertData } from '../gql/schema'
import { REMOVE_CONCERT_MUTATION } from '../gql/mutations'

export default function useRemoveConcertMutation(
  options?: MutationHookOptions<
    { removeConcert: RemoveConcertData },
    { input: { id: number } },
    DefaultContext,
    ApolloCache<any>
  >
) {
  return useMutation<
    {
      removeConcert: RemoveConcertData
    },
    {
      input: {
        id: number
      }
    }
  >(REMOVE_CONCERT_MUTATION, options)
}
