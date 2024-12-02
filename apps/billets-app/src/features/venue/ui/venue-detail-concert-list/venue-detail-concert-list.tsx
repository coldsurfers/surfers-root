import { HorizontalConcertItem } from '@/features/concert/ui'
import { useVenueConcertListQuery } from '@/lib/react-query/queries/use-venue-concert-list-query'
import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'
import format from 'date-fns/format'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { VenueDetailTop } from '../venue-detail-top'

export const VenueDetailConcertList = ({
  venueId,
  onPressItem,
}: {
  venueId: string
  onPressItem?: (params: { concertId: string }) => void
}) => {
  const {
    data: venueConcertList,
    isPending: isPendingVenueConcertList,
    isFetchingNextPage: isFetchingNextPageVenueConcerList,
    hasNextPage: hasNextPageVenueConcertList,
    fetchNextPage: fetchNextPageVenueConcertList,
  } = useVenueConcertListQuery({
    venueId,
  })
  const venueConcertListUIData = useMemo(() => {
    return venueConcertList?.pages.flat() ?? []
  }, [venueConcertList?.pages])

  const isInitialLoading = isPendingVenueConcertList

  const renderItem = useCallback<ListRenderItem<(typeof venueConcertListUIData)[number]>>(
    (info) => {
      return (
        <HorizontalConcertItem
          onPress={() => onPressItem?.({ concertId: info.item.id })}
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
    },
    [onPressItem],
  )

  const onEndReached = useCallback(async () => {
    if (isPendingVenueConcertList || isFetchingNextPageVenueConcerList || !hasNextPageVenueConcertList) {
      return
    }
    await fetchNextPageVenueConcertList()
  }, [
    fetchNextPageVenueConcertList,
    hasNextPageVenueConcertList,
    isFetchingNextPageVenueConcerList,
    isPendingVenueConcertList,
  ])

  if (isInitialLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating />
      </View>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={<VenueDetailTop venueId={venueId} />}
      data={venueConcertListUIData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
      onEndReached={onEndReached}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
