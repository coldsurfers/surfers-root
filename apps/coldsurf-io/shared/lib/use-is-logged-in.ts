'use client';

import { apiClient } from '@/libs/openapi-client';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useIsLoggedIn = () => {
  const { data: userData, isLoading: isLoadingUser } = useQuery<
    Awaited<ReturnType<typeof apiClient.user.getMe>> | null,
    OpenApiError
  >({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: async () => {
      try {
        const data = await apiClient.user.getMe();
        return data;
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.error('server error', e);
        }
        return null;
      }
    },
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
