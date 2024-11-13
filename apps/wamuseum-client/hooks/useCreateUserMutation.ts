import { MutationHookOptions, useMutation } from '@apollo/client'
import { CreateUserMutation } from '../gql/mutations'
import { CreateUserData } from '../gql/schema'

type TData = {
  createUser: CreateUserData
}
type TVariables = {
  input: {
    email: string
    password: string
    passwordConfirm: string
  }
}
type Options = MutationHookOptions<TData, TVariables>

export default function useCreateUserMutation(options?: Options) {
  return useMutation<TData, TVariables>(CreateUserMutation, options)
}
