import { OpenApiError } from '@/lib/api/openapi-error'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import { components } from '../../../types/api'
import client from '../../api/openapi-client'

function useSendEmailConfirmMutation(
  options: MutationOptions<
    components['schemas']['SendAuthCodeSuccessResponse'] | undefined,
    OpenApiError,
    {
      email: string
    }
  >,
) {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await client.POST('/v1/auth/email/send-auth-code', {
        body: {
          email,
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
    ...options,
  })
}

export default useSendEmailConfirmMutation
