import { apiClient } from '@/libs/openapi-client';

export async function getEventMetadata(slug: string) {
  if (!slug) {
    return null;
  }
  try {
    const eventDetailData = await apiClient.event.getEventDetailBySlug(slug);
    if (!eventDetailData) {
      return null;
    }
    if (eventDetailData.type !== 'concert') {
      return null;
    }
    return {
      eventDetail: eventDetailData.data,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
