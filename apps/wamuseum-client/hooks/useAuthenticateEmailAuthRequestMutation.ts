import { MutationHookOptions, useMutation } from '@apollo/client'
import { AuthenticateEmailAuthRequestMutation } from '../gql/mutations'
import { AuthenticateEmailAuthRequestData } from '../gql/schema'

type TData = {
  authenticateEmailAuthRequest: AuthenticateEmailAuthRequestData
}
type TVariables = {
  input: {
    email: string
    authcode: string
  }
}

type Options = MutationHookOptions<TData, TVariables>

export default function useAuthenticateEmailAuthRequestMutation(options?: Options) {
  return useMutation<TData, TVariables>(AuthenticateEmailAuthRequestMutation, options)
}
