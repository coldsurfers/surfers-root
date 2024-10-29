import {MutationOptions, useMutation} from '@tanstack/react-query';
import client from '../../api/openapi-client';
import {components} from '../../../types/api';
import APIError from '../../api/APIError';

function useSignupEmailMutation(
  options: MutationOptions<
    components['schemas']['SignUpSuccessResponse'] | undefined,
    APIError,
    components['schemas']['SignUpBody']
  >,
) {
  return useMutation({
    mutationFn: async (params: components['schemas']['SignUpBody']) => {
      const response = await client.POST('/v1/auth/signup', {
        body: params,
      });
      return response.data;
    },
    ...options,
  });
}

export default useSignupEmailMutation;
