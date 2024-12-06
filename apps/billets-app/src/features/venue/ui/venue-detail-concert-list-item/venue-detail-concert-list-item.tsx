import { HorizontalConcertItem } from '@/features/concert/ui'
import { ConcertSubscribeButton } from '@/features/subscribe/ui'
import useSubscribedConcertQuery from '@/lib/react-query/queries/useSubscribedConcertQuery'
import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'
import format from 'date-fns/format'
import { VenueDetailConcertListItemProps } from './venue-detail-concert-list-item.types'

export const VenueDetailConcertListItem = ({ item, onPress, onPressSubscribe }: VenueDetailConcertListItemProps) => {
  const { data: subscribedConcert } = useSubscribedConcertQuery({
    concertId: item.id,
  })
  return (
    <HorizontalConcertItem
      onPress={() => onPress(item)}
      title={item.title}
      subtitle={format(new Date(item.date), 'EEE, MMM dd')}
      description={item.venues.at(0)?.venueTitle ?? ''}
      thumbnailComponent={
        <ProfileThumbnail
          type="square"
          emptyBgText={item.title.at(0) ?? ''}
          imageUrl={item.posters.at(0)?.imageUrl}
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
