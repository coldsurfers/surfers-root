import { VenueDetailConcertList } from '@/features/venue/ui'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useVenueDetailScreenNavigation, useVenueDetailScreenRoute } from './venue-detail-screen.hooks'

export const VenueDetailScreen = () => {
  const { top: topInset } = useSafeAreaInsets()
  const navigation = useVenueDetailScreenNavigation()
  const route = useVenueDetailScreenRoute()
  return (
    <CommonScreenLayout>
      <CommonBackIconButton top={topInset} onPress={navigation.goBack} />
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
