import { CommonScreenLayout, VenueDetailConcertList } from '@/ui'
import { useVenueDetailScreenNavigation, useVenueDetailScreenRoute } from './venue-detail-screen.hooks'

export const VenueDetailScreen = () => {
  const navigation = useVenueDetailScreenNavigation()
  const route = useVenueDetailScreenRoute()
  return (
    <CommonScreenLayout>
      <VenueDetailConcertList
        venueId={route.params.id}
        onPressItem={({ eventId }) => {
          navigation.navigate('EventStackNavigation', {
            screen: 'EventDetailScreen',
            params: {
              eventId,
            },
          })
        }}
      />
    </CommonScreenLayout>
  )
}
