import { VenueDetailTop } from '@/features/venue/ui'
import { useVenueConcertListQuery } from '@/lib/react-query/queries/use-venue-concert-list-query'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { Text } from '@coldsurfers/ocean-road/native'
import { useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
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
      <FlatList
        ListHeaderComponent={<VenueDetailTop venueId={route.params.id} />}
        data={venueConcertListUIData}
        renderItem={(info) => {
          return (
            <View>
              <Text>{info.item.title}</Text>
            </View>
          )
        }}
        contentContainerStyle={styles.contentContainer}
      />
    </CommonScreenLayout>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
  },
})
