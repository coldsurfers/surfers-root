import { apiClient } from '@/lib/api/openapi-client'

export const fetchConcertDetails = (id: string) => {
  return apiClient.event.getEventDetail(id)
}
