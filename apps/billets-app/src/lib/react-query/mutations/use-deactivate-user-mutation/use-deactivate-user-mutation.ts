import client from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/api/openapi-error'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

const mutationFn = async () => {
  const response = await client.DELETE('/v1/user/deactivate', {
    body: {
      type: 'deactivate',
    },
  })
  if (response.error) {
    throw new OpenApiError(response.error)
  }
  return response
}

type Options = UseMutationOptions<Awaited<ReturnType<typeof mutationFn>>, OpenApiError>

export const useDeactivateUserMutation = (options?: Options) => {
  return useMutation({
    ...options,
    mutationFn,
  })
}
