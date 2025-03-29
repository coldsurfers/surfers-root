import { apiClient } from '@/lib/api/openapi-client'
import { useQuery } from '@tanstack/react-query'

export const useMeQuery = () => {
  const { data: meData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  })
  return {
    meData,
  }
}
