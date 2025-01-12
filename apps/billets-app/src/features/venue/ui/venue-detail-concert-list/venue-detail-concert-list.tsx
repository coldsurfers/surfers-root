import { useToggleSubscribeConcert } from '@/features/subscribe'
import { apiClient } from '@/lib/api/openapi-client'
import { useVenueDetailScreenNavigation } from '@/screens/venue-detail-screen/venue-detail-screen.hooks'
import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VenueDetailConcertListItem } from '../venue-detail-concert-list-item'
import { VenueDetailTop } from '../venue-detail-top'

const PER_PAGE = 20

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
    isFetchingNextPage: isFetchingNextPageVenueConcertList,
    hasNextPage: hasNextPageVenueConcertList,
    fetchNextPage: fetchNextPageVenueConcertList,
  } = useSuspenseInfiniteQuery({
    initialPageParam: 0,
    queryKey: apiClient.queryKeys.concert.list.paginated.byVenueId(venueId),
    queryFn: ({ pageParam = 0 }) =>
      apiClient.concert.getConcertsByVenueId({
        venueId,
        offset: pageParam,
        size: PER_PAGE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined
      }
      if (lastPage.length < PER_PAGE) {
        return undefined
      }
      return allPages.length * PER_PAGE
    },
  })
  const { data: meData } = useQuery({
    queryKey: apiClient.queryKeys.user.me,
    queryFn: () => apiClient.user.getMe(),
  })
  const toggleSubscribeConcert = useToggleSubscribeConcert()

  const venueConcertListUIData = useMemo(() => {
    return venueConcertList?.pages.flat() ?? []
  }, [venueConcertList?.pages])

  const isInitialLoading = isPendingVenueConcertList

  const renderItem = useCallback<ListRenderItem<(typeof venueConcertListUIData)[number]>>(
    ({ item }) => {
      return (
        <VenueDetailConcertListItem
          item={item}
          onPress={() => onPressItem?.({ concertId: item.id })}
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
    if (isPendingVenueConcertList || isFetchingNextPageVenueConcertList || !hasNextPageVenueConcertList) {
      return
    }
    await fetchNextPageVenueConcertList()
  }, [
    fetchNextPageVenueConcertList,
    hasNextPageVenueConcertList,
    isFetchingNextPageVenueConcertList,
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
