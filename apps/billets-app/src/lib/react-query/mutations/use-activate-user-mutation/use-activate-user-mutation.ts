import client from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/api/openapi-error'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

const mutationFn = async ({ authCode, email }: { authCode: string; email: string }) => {
  const response = await client.PATCH('/v1/user/activate', {
    body: {
      type: 'activate',
      authCode,
      email,
    },
  })
  if (response.error) {
    throw new OpenApiError(response.error)
  }
  return response.data
}

type Options = UseMutationOptions<
  Awaited<ReturnType<typeof mutationFn>>,
  OpenApiError,
  {
    authCode: string
    email: string
  }
>

export const useActivateUserMutation = (options?: Options) => {
  return useMutation({
    ...options,
    mutationFn,
  })
}
