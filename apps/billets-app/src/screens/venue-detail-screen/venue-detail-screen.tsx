import { VenueDetailConcertList } from '@/features/venue/ui'
import { CommonScreenLayout } from '@/ui'
import { useVenueDetailScreenNavigation, useVenueDetailScreenRoute } from './venue-detail-screen.hooks'

export const VenueDetailScreen = () => {
  const navigation = useVenueDetailScreenNavigation()
  const route = useVenueDetailScreenRoute()
  return (
    <CommonScreenLayout>
      <VenueDetailConcertList
        venueId={route.params.id}
        onPressItem={({ concertId }) => {
          navigation.navigate('ConcertStackScreen', {
            screen: 'ConcertDetailScreen',
            params: {
              concertId,
            },
          })
        }}
      />
    </CommonScreenLayout>
  )
}
