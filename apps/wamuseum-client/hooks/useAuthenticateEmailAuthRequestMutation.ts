import { useMutation } from '@apollo/client'
import { AuthenticateEmailAuthRequestData } from '../gql/schema'
import { AuthenticateEmailAuthRequestMutation } from '../gql/mutations'

export default function useAuthenticateEmailAuthRequestMutation() {
  return useMutation<
    {
      authenticateEmailAuthRequest: AuthenticateEmailAuthRequestData
    },
    {
      input: {
        email: string
        authcode: string
      }
    }
  >(AuthenticateEmailAuthRequestMutation)
}
