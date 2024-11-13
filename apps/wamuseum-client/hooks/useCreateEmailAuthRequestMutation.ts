import { MutationHookOptions, useMutation } from '@apollo/client'
import { CreateEmailAuthRequestMutation } from '../gql/mutations'
import { EmailAuthRequest } from '../gql/schema'

type TData = {
  createEmailAuthRequest: EmailAuthRequest
}
type TVariables = {
  input: {
    email: string
  }
}
type Options = MutationHookOptions<TData, TVariables>

export default function useCreateEmailAuthRequestMutation(options?: Options) {
  return useMutation<TData, TVariables>(CreateEmailAuthRequestMutation, options)
}
