import { apiClient } from '@/libs/openapi-client'

export async function getEventMetadata(eventId: string) {
  if (!eventId) {
    return null
  }
  try {
    const eventDetailData = await apiClient.event.getEventDetail(eventId)
    if (!eventDetailData) {
      return null
    }
    if (eventDetailData.type !== 'concert') {
      return null
    }
    return {
      eventDetail: eventDetailData.data,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
