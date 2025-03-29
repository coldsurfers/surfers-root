import { apiClient } from '@/lib/api/openapi-client'
import { useQuery } from '@tanstack/react-query'

export const useSubscribedConcert = (eventId: string) => {
  const { data: subscribedConcert } = useQuery({
    queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
    queryFn: () => apiClient.subscribe.getEvent({ eventId }),
  })

  return {
    subscribedConcert,
  }
}
