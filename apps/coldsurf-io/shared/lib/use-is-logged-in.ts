'use client';

import { apiClient } from '@/libs/openapi-client';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useIsLoggedIn = () => {
  const { data: userData, isLoading: isLoadingUser } = useQuery<
    Awaited<ReturnType<typeof apiClient.user.getMe>>,
    OpenApiError
  >({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });

  const isLoggedIn = useMemo(() => {
    return !!userData;
  }, [userData]);

  return {
    isLoggedIn,
    isLoading: isLoadingUser,
    user: userData,
  };
};
