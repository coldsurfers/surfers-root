import { apiClient } from '@/lib/api/openapi-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchConcertDetails } from '../api/fetchConcertDetails'

export const useConcertDetailQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: apiClient.event.queryKeys.detail(id),
    queryFn: () => fetchConcertDetails(id),
  })
}
