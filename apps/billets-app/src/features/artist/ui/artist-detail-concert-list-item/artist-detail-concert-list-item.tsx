import { HorizontalConcertItem } from '@/features/concert/ui'
import { useToggleSubscribeConcert } from '@/features/subscribe'
import { ConcertSubscribeButton } from '@/features/subscribe/ui'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import useSubscribedConcertQuery from '@/lib/react-query/queries/useSubscribedConcertQuery'
import { useVenueDetailScreenNavigation } from '@/screens/venue-detail-screen/venue-detail-screen.hooks'
import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'
import format from 'date-fns/format'
import { ArtistDetailConcertListItemProps } from './artist-detail-concert-list-item.types'

export const ArtistDetailConcertListItem = ({ item, onPress }: ArtistDetailConcertListItemProps) => {
  const toggleSubscribe = useToggleSubscribeConcert()
  const { data: subscribedConcert } = useSubscribedConcertQuery({
    concertId: item.id,
  })
  const { data: meData } = useGetMeQuery()
  const navigation = useVenueDetailScreenNavigation()
  const isLoggedIn = !!meData
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
          size="sm"
          onPress={() => {
            if (!isLoggedIn) {
              navigation.navigate('LoginStackScreen', {
                screen: 'LoginSelectionScreen',
                params: {},
              })
              return
            }
            toggleSubscribe({ concertId: item.id, isSubscribed: !!subscribedConcert })
          }}
          isSubscribed={!!subscribedConcert}
        />
      }
    />
  )
}
