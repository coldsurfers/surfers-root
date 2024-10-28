import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  useMutation,
} from '@apollo/client'
import { LoginData } from '../gql/schema'
import { LoginMutation } from '../gql/mutations'

export default function useLoginMutation(
  options?: MutationHookOptions<
    { login: LoginData },
    { input: { email: string; password: string } },
    DefaultContext,
    ApolloCache<any>
  >
) {
  return useMutation<
    {
      login: LoginData
    },
    {
      input: {
        email: string
        password: string
      }
    }
  >(LoginMutation, options)
}
