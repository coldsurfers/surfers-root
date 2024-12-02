import { HorizontalConcertItem } from '@/features'
import { VenueDetailTop } from '@/features/venue/ui'
import { useVenueConcertListQuery } from '@/lib/react-query/queries/use-venue-concert-list-query'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'
import format from 'date-fns/format'
import { useMemo } from 'react'
import { FlatList, StyleSheet } from 'react-native'
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
            <HorizontalConcertItem
              onPress={() => {
                navigation.navigate('ConcertStackScreen', {
                  screen: 'ConcertDetailScreen',
                  params: {
                    concertId: info.item.id,
                  },
                })
              }}
              title={info.item.title}
              subtitle={format(new Date(info.item.date), 'EEE, MMM dd')}
              description={info.item.venues.at(0)?.venueTitle ?? ''}
              thumbnailComponent={
                <ProfileThumbnail
                  type="square"
                  emptyBgText={info.item.title.at(0) ?? ''}
                  imageUrl={info.item.posters.at(0)?.imageUrl}
                  size="md"
                />
              }
            />
          )
        }}
        keyExtractor={(item) => item.id}
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
