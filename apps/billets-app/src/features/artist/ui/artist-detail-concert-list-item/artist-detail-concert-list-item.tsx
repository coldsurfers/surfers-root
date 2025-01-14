import { HorizontalConcertItem } from '@/features/concert/ui'
import { useToggleSubscribeConcert } from '@/features/subscribe'
import { ConcertSubscribeButton } from '@/features/subscribe/ui'
import { apiClient } from '@/lib/api/openapi-client'
import { useVenueDetailScreenNavigation } from '@/screens/venue-detail-screen/venue-detail-screen.hooks'
import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'
import { useQuery } from '@tanstack/react-query'
import format from 'date-fns/format'
import { ArtistDetailConcertListItemProps } from './artist-detail-concert-list-item.types'

export const ArtistDetailConcertListItem = ({ item, onPress }: ArtistDetailConcertListItemProps) => {
  const toggleSubscribe = useToggleSubscribeConcert()
  const { data: subscribedConcert } = useQuery({
    queryKey: apiClient.queryKeys.subscribe.concert.detail(item.id),
    queryFn: () => apiClient.subscribe.getSubscribedConcert(item.id),
  })
  const { data: meData } = useQuery({
    queryKey: apiClient.queryKeys.user.me,
    queryFn: () => apiClient.user.getMe(),
  })
  const navigation = useVenueDetailScreenNavigation()
  const isLoggedIn = !!meData
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
          onPress={() => {
            if (!isLoggedIn) {
              navigation.navigate('LoginStackNavigation', {
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
