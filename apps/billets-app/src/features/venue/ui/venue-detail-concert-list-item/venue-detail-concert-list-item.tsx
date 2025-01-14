import { HorizontalConcertItem } from '@/features/concert/ui'
import { ConcertSubscribeButton } from '@/features/subscribe/ui'
import { apiClient } from '@/lib/api/openapi-client'
import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'
import { useQuery } from '@tanstack/react-query'
import format from 'date-fns/format'
import { VenueDetailConcertListItemProps } from './venue-detail-concert-list-item.types'

export const VenueDetailConcertListItem = ({ item, onPress, onPressSubscribe }: VenueDetailConcertListItemProps) => {
  const { data: subscribedConcert } = useQuery({
    queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId: item.id }),
    queryFn: () => apiClient.subscribe.getEvent({ eventId: item.id }),
  })
  return (
    <HorizontalConcertItem
      onPress={() => onPress(item)}
      title={item.title}
      subtitle={format(item.date ? new Date(item.date) : new Date(), 'EEE, MMM dd')}
      description={item.mainVenue?.name ?? ''}
      thumbnailComponent={
        <ProfileThumbnail
          type="square"
          emptyBgText={item.title.at(0) ?? ''}
          imageUrl={item.mainPoster?.url ?? ''}
          size="md"
        />
      }
      bottomRightAddOn={
        <ConcertSubscribeButton
          onPress={() => onPressSubscribe({ concertId: item.id, isSubscribed: !!subscribedConcert })}
          isSubscribed={!!subscribedConcert}
        />
      }
    />
  )
}
