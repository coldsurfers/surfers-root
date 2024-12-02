import { VenueDetailTop } from '@/features/venue/ui'
import { useVenueConcertListQuery } from '@/lib/react-query/queries/use-venue-concert-list-query'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useVenueDetailScreenNavigation, useVenueDetailScreenRoute } from './venue-detail-screen.hooks'

export const VenueDetailScreen = () => {
  const { top: topInset } = useSafeAreaInsets()
  const navigation = useVenueDetailScreenNavigation()
  const route = useVenueDetailScreenRoute()

  const {
    data: venueConcertList,
    isPending: isPendingVenueConcertList,
    isFetchingNextPage: isFetchingNextPageVenueConcerList,
    hasNextPage: hasNextPageVenueConcertList,
  } = useVenueConcertListQuery({
    venueId: route.params.id,
  })

  const venueConcertListUIData = useMemo(() => {
    return venueConcertList?.pages.flat() ?? []
  }, [venueConcertList?.pages])

  return (
    <CommonScreenLayout>
      <CommonBackIconButton top={topInset} onPress={navigation.goBack} />
      <VenueDetailTop venueId={route.params.id} />
    </CommonScreenLayout>
  )
}

const styles = StyleSheet.create({})
