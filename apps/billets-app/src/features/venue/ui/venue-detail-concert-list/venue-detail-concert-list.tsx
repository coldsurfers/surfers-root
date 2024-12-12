import { useToggleSubscribeConcert } from '@/features/subscribe'
import { useVenueConcertListQuery } from '@/lib/react-query/queries/use-venue-concert-list-query'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import { useVenueDetailScreenNavigation } from '@/screens/venue-detail-screen/venue-detail-screen.hooks'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VenueDetailConcertListItem } from '../venue-detail-concert-list-item'
import { VenueDetailTop } from '../venue-detail-top'

export const VenueDetailConcertList = ({
  venueId,
  onPressItem,
}: {
  venueId: string
  onPressItem?: (params: { concertId: string }) => void
}) => {
  const navigation = useVenueDetailScreenNavigation()
  const { bottom: bottomInset } = useSafeAreaInsets()
  const {
    data: venueConcertList,
    isPending: isPendingVenueConcertList,
    isFetchingNextPage: isFetchingNextPageVenueConcerList,
    hasNextPage: hasNextPageVenueConcertList,
    fetchNextPage: fetchNextPageVenueConcertList,
  } = useVenueConcertListQuery({
    venueId,
  })
  const { data: meData } = useGetMeQuery()
  const toggleSubscribeConcert = useToggleSubscribeConcert()

  const venueConcertListUIData = useMemo(() => {
    return venueConcertList?.pages.flat() ?? []
  }, [venueConcertList?.pages])

  const isInitialLoading = isPendingVenueConcertList

  const renderItem = useCallback<ListRenderItem<(typeof venueConcertListUIData)[number]>>(
    (info) => {
      return (
        <VenueDetailConcertListItem
          item={info.item}
          onPress={() => onPressItem?.({ concertId: info.item.id })}
          onPressSubscribe={({ concertId, isSubscribed }) => {
            if (!meData) {
              navigation.navigate('LoginStackNavigation', {
                screen: 'LoginSelectionScreen',
                params: {},
              })
              return
            }
            toggleSubscribeConcert({
              concertId,
              isSubscribed,
            })
          }}
        />
      )
    },
    [meData, navigation, onPressItem, toggleSubscribeConcert],
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
      contentContainerStyle={[styles.contentContainer, { paddingBottom: bottomInset }]}
      onEndReached={onEndReached}
      style={{ flex: 1 }}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
