import client from '@/lib/api/openapi-client'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

const mutationFn = async (variables: TVariables) => {
  return await client.POST('/v1/user/fcm-token', {
    body: {
      fcmToken: variables.fcmToken,
    },
  })
}

type TData = Awaited<ReturnType<typeof mutationFn>>
type TError = unknown
type TVariables = {
  fcmToken: string
}

type Options = UseMutationOptions<TData, TError, TVariables>

export const useSendFCMTokenMutation = (options?: Options) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  })
}
