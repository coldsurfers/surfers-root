'use client';

import { apiClient } from '@/libs/openapi-client';
import { getQueryClient } from '@/libs/utils';
import { authUtils } from '@/libs/utils/utils.auth';
import { useMutation } from '@tanstack/react-query';

export const useLogout = ({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: (error: Error) => void }) => {
  const queryClient = getQueryClient();
  const {
    mutate: logout,
    mutateAsync: logoutAsync,
    isPending: isLogoutPending,
  } = useMutation({
    mutationFn: () => authUtils.localLogout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiClient.user.queryKeys.me });
      onSuccess?.();
    },
    onError,
  });

  return {
    logout,
    logoutAsync,
    isLogoutPending,
  };
};
