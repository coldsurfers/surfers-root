import { OpenApiError } from '@/lib/api/openapi-error'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import { components } from '../../../types/api'
import client from '../../api/openapi-client'

function useSignupEmailMutation(
  options: MutationOptions<
    components['schemas']['SignUpSuccessResponse'] | undefined,
    OpenApiError,
    components['schemas']['SignUpBody']
  >,
) {
  return useMutation({
    mutationFn: async (params: components['schemas']['SignUpBody']) => {
      const response = await client.POST('/v1/auth/signup', {
        body: params,
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
    ...options,
  })
}

export default useSignupEmailMutation
