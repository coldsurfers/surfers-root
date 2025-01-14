// import useConcertListQuery from '@/lib/react-query/queries/useConcertListQuery'
import { apiClient } from '@/lib/api/openapi-client'
import { CommonListEmpty } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Spinner } from '@coldsurfers/ocean-road/native'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { forwardRef, useCallback, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native'
import { ConcertListItem } from '../concert-list-item'
import { concertListStyles } from './concert-list.styles'
import { ConcertListItemType } from './concert-list.types'

type ConcertListProps = {
  onPressItem?: (item: ConcertListItemType) => void
  onPressSubscribe?: (item: ConcertListItemType, options: { isSubscribed: boolean }) => void
  latitude: number
  longitude: number
}

const PER_PAGE = 20

export const ConcertList = forwardRef<FlatList, ConcertListProps>(
  ({ onPressItem, onPressSubscribe, latitude, longitude }, ref) => {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const { data, isPending, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useSuspenseInfiniteQuery({
      initialPageParam: 0,
      queryKey: apiClient.event.queryKeys.list({ latitude, longitude }),
      queryFn: ({ pageParam = 0 }) =>
        apiClient.event.getList({ offset: pageParam, size: PER_PAGE, latitude, longitude }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PER_PAGE) {
          return undefined
        }
        return allPages.length * PER_PAGE
      },
      refetchOnWindowFocus: false,
    })

    const concertList = useMemo<ConcertListItemType[]>(() => {
      return data.pages.flatMap((page) => page).map((data) => data.data)
    }, [data?.pages])

    const renderItem: ListRenderItem<ConcertListItemType> = useCallback(
      ({ item }) => {
        return (
          <ConcertListItem
            data={item}
            onPress={() => onPressItem?.(item)}
            onPressSubscribe={({ isSubscribed }) => onPressSubscribe?.(item, { isSubscribed })}
          />
        )
      },
      [onPressItem, onPressSubscribe],
    )

    const onEndReached = useCallback(async () => {
      if (isPending || isFetchingNextPage) {
        return
      }
      if (!hasNextPage) {
        return
      }
      await fetchNextPage()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isPending])

    const onRefresh = useCallback(async () => {
      setIsRefreshing(true)
      await refetch()
      setIsRefreshing(false)
    }, [refetch])

    return (
      <FlatList
        scrollsToTop
        ref={ref}
        numColumns={2}
        data={concertList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={concertListStyles.concertListContentContainer}
        ListEmptyComponent={
          isPending ? (
            <View style={concertListStyles.loadingIndicatorWrapper}>
              <Spinner />
            </View>
          ) : (
            <CommonListEmpty emptyText={`🥺\n앗,\n해당하는\n위치에\n공연 정보가 없어요!`} />
          )
        }
        ListFooterComponent={isFetchingNextPage ? <Spinner size="medium" /> : null}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.oc.cyan[5].value}
            size={20}
          />
        }
        scrollEnabled={!isRefreshing}
        onEndReached={onEndReached}
      />
    )
  },
)
