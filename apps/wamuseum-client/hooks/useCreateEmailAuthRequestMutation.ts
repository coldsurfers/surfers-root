import { useMutation } from '@apollo/client'
import { EmailAuthRequest } from '../gql/schema'
import { CreateEmailAuthRequestMutation } from '../gql/mutations'

export default function useCreateEmailAuthRequestMutation() {
  return useMutation<
    {
      createEmailAuthRequest: EmailAuthRequest
    },
    {
      input: {
        email: string
      }
    }
  >(CreateEmailAuthRequestMutation)
}
