import { MutationOptions, useMutation } from '@tanstack/react-query'
import { components } from '../../../types/api'
import APIError from '../../api/APIError'
import client from '../../api/openapi-client'

function useSendEmailConfirmMutation(
  options: MutationOptions<
    components['schemas']['SendAuthCodeSuccessResponse'] | undefined,
    APIError,
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
      if (response.response.status === 409) {
        throw new APIError(
          {
            message: '이미 가입된 이메일이에요',
          },
          {
            status: response.response.status,
          },
        )
      }
      return response.data
    },
    ...options,
  })
}

export default useSendEmailConfirmMutation
