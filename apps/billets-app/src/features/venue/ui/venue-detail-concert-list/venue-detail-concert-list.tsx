import { useVenueConcertListQuery } from '@/lib/react-query/queries/use-venue-concert-list-query'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { VenueDetailConcertListItem } from '../venue-detail-concert-list-item'
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
      return <VenueDetailConcertListItem item={info.item} onPress={() => onPressItem?.({ concertId: info.item.id })} />
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
