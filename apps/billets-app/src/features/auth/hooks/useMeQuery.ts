import { apiClient } from '@/lib/api/openapi-client'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useMeQuery = () => {
  const { data: meData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  })
  return {
    meData,
  }
}

export const useSuspenseMeQuery = () => {
  const { data: meData } = useSuspenseQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  })
  return {
    meData,
  }
}
