import { withHapticPress } from '@/lib'
import { CommonScreenLayout, VenueDetailConcertList } from '@/ui'
import { useCallback } from 'react'
import { useVenueDetailScreenNavigation, useVenueDetailScreenRoute } from './venue-detail-screen.hooks'

export const VenueDetailScreen = () => {
  const navigation = useVenueDetailScreenNavigation()
  const route = useVenueDetailScreenRoute()
  const handlePressItem = useCallback(
    ({ eventId }: { eventId: string }) => {
      navigation.push('EventStackNavigation', {
        screen: 'EventDetailScreen',
        params: {
          eventId,
        },
      })
    },
    [navigation],
  )
  return (
    <CommonScreenLayout withBottomTab={false}>
      <VenueDetailConcertList
        venueId={route.params.id}
        onPressItem={withHapticPress(handlePressItem, 'impactMedium')}
      />
    </CommonScreenLayout>
  )
}
