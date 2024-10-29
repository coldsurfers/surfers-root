import {MutationOptions, useMutation} from '@tanstack/react-query';
import client from '../../api/openapi-client';
import {components} from '../../../types/api';
import APIError from '../../api/APIError';

function useUpdateEmailConfirmMutation(
  options: MutationOptions<
    components['schemas']['ConfirmAuthCodeSuccessResponse'] | undefined,
    APIError,
    components['schemas']['ConfirmAuthCodeBody']
  >,
) {
  return useMutation({
    mutationFn: async (
      params: components['schemas']['ConfirmAuthCodeBody'],
    ) => {
      const response = await client.POST('/v1/auth/email/confirm-auth-code', {
        body: params,
      });

      if (response.response.status === 409) {
        throw new APIError(
          {
            message: '이미 인증되었어요',
          },
          {status: 409},
        );
      }
      if (response.response.status === 401) {
        throw new APIError(
          {
            message: '인증번호가 일치하지 않거나, 인증 시간이 지났어요',
          },
          {status: 401},
        );
      }

      return response.data;
    },
    ...options,
  });
}

export default useUpdateEmailConfirmMutation;
