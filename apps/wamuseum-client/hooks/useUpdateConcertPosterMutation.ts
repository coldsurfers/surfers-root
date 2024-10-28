import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  useMutation,
} from '@apollo/client'
import { UpdateConcertPosterData } from '../gql/schema'
import { UpdateConcertPosterMutation } from '../gql/mutations'

export default function useUpdateConcertPosterMutation(
  options?: MutationHookOptions<
    { updateConcertPoster: UpdateConcertPosterData },
    { input: { id: number; imageURL: string } },
    DefaultContext,
    ApolloCache<any>
  >
) {
  return useMutation<
    {
      updateConcertPoster: UpdateConcertPosterData
    },
    {
      input: {
        id: number
        imageURL: string
      }
    }
  >(UpdateConcertPosterMutation, options)
}
