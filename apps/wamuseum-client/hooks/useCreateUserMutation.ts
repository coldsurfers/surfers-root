import { useMutation } from '@apollo/client'
import { CreateUserData } from '../gql/schema'
import { CreateUserMutation } from '../gql/mutations'

export default function useCreateUserMutation() {
  return useMutation<
    {
      createUser: CreateUserData
    },
    {
      input: {
        email: string
        password: string
        passwordConfirm: string
      }
    }
  >(CreateUserMutation)
}
