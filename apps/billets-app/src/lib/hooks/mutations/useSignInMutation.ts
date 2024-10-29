import {MutationOptions, useMutation} from '@tanstack/react-query';
import client from '../../api/openapi-client';
import {components} from '../../../types/api';

const mutationFn = async (body: components['schemas']['SignInBody']) => {
  const response = await client.POST('/v1/auth/signin', {
    body,
  });
  return response.data;
};

function useSignInMutation(
  options?: MutationOptions<
    Awaited<ReturnType<typeof mutationFn>>,
    unknown,
    components['schemas']['SignInBody']
  >,
) {
  return useMutation({
    mutationFn,
    ...options,
  });
}

export default useSignInMutation;
