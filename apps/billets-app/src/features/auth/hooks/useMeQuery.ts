import { apiClient } from '@/lib/api/openapi-client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useMeQuery = () => {
  return useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });
};

export const useSuspenseMeQuery = () => {
  const { data: meData } = useSuspenseQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });
  return {
    meData,
  };
};
