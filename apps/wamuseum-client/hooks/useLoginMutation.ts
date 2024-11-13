import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client'
import { LoginMutation } from '../gql/mutations'
import { LoginData } from '../gql/schema'

type TData = { login: LoginData }
type TVaraibles = { input: { email: string; password: string } }
type Options = MutationHookOptions<TData, TVaraibles, DefaultContext, ApolloCache<unknown>>

export default function useLoginMutation(options?: Options) {
  return useMutation<TData, TVaraibles>(LoginMutation, options)
}
