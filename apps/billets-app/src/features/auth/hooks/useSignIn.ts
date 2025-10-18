import { apiClient } from '@/lib/api/openapi-client';
import { AuthContext } from '@/lib/contexts';
import type { OpenApiError, components } from '@coldsurfers/api-sdk';
import type { LoginProvider } from '@coldsurfers/shared-utils';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';

type Variables = {
  email: string;
  password?: string;
  platform?: 'android' | 'ios';
  provider: LoginProvider;
  token?: string;
};

export const useSignIn = ({
  onSuccess,
}: {
  onSuccess?: (
    data: components['schemas']['UserWithAuthTokenDTOSchema'],
    variables: Variables
  ) => Promise<void> | void;
}) => {
  const { login } = useContext(AuthContext);
  return useMutation<components['schemas']['UserWithAuthTokenDTOSchema'], OpenApiError, Variables>({
    mutationFn: apiClient.auth.signIn,
    onSuccess: async (data, variables) => {
      if (!data) {
        return;
      }
      const { user, authToken } = data;
      await login({
        user,
        authToken,
        analyticsOptions: {
          provider: variables.provider,
        },
      });
      onSuccess?.(data, variables);
    },
  });
};
