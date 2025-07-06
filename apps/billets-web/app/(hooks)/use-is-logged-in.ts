import { apiClient } from '@/libs/openapi-client';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useIsLoggedIn = () => {
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });

  const isLoggedIn = useMemo(() => {
    return !!userData;
  }, [userData]);

  return {
    isLoggedIn,
    isLoading: isLoadingUser,
  };
};
