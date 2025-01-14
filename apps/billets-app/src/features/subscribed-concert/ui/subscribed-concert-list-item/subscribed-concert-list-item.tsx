import { apiClient } from '@/lib/api/openapi-client'
import { components } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { ConcertListItem } from '../../../concert/ui'

export function SubscribedConcertListItem({
  data,
  onPress,
  size = 'small',
}: {
  data: components['schemas']['EventSubscribeDTOSchema']
  onPress: (concertId: string) => void
  size?: 'small' | 'large'
}) {
  const { data: eventDetailData } = useQuery({
    queryKey: apiClient.event.queryKeys.detail({ eventId: data.eventId }),
    queryFn: () => apiClient.event.getDetail({ eventId: data.eventId }),
  })
  if (!eventDetailData || eventDetailData.type !== 'concert') {
    return null
  }
  const mainPoster = eventDetailData.data.posters.at(0)
  const mainVenue = eventDetailData.data.venues.at(0)
  if (!mainPoster || !mainVenue) {
    return null
  }
  return (
    <ConcertListItem
      data={{
        id: eventDetailData.data.id,
        title: eventDetailData.data.title,
        date: eventDetailData.data.date,
        mainPoster: {
          url: mainPoster.url,
        },
        mainVenue: {
          name: mainVenue.name,
        },
      }}
      onPress={onPress}
      size={size}
    />
  )
}
