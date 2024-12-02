import { OpenApiError } from '@/lib/api/openapi-error'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import { components } from '../../../types/api'
import client from '../../api/openapi-client'

const mutationFn = async (body: components['schemas']['SignInBody']) => {
  const response = await client.POST('/v1/auth/signin', {
    body,
  })
  if (response.error) {
    throw new OpenApiError(response.error)
  }
  return response.data
}

function useSignInMutation(
  options?: MutationOptions<Awaited<ReturnType<typeof mutationFn>>, OpenApiError, components['schemas']['SignInBody']>,
) {
  return useMutation({
    mutationFn,
    ...options,
  })
}

export default useSignInMutation
