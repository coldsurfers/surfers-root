import { OpenApiError } from '@/lib/api/openapi-error'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import { components } from '../../../types/api'
import client from '../../api/openapi-client'

function useUpdateEmailConfirmMutation(
  options: MutationOptions<
    components['schemas']['ConfirmAuthCodeSuccessResponse'] | undefined,
    OpenApiError,
    components['schemas']['ConfirmAuthCodeBody']
  >,
) {
  return useMutation({
    mutationFn: async (params: components['schemas']['ConfirmAuthCodeBody']) => {
      const response = await client.POST('/v1/auth/email/confirm-auth-code', {
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

export default useUpdateEmailConfirmMutation
