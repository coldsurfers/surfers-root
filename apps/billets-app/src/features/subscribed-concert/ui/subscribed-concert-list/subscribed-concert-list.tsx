import { ConcertListItem } from '@/features/concert'
import { apiClient } from '@/lib/api/openapi-client'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { Suspense, useCallback, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { SubscribedConcertListItem } from '../subscribed-concert-list-item'
import { subscribedConcertListStyles } from './subscribed-concert-list.styles'

const ItemSeparator = () => <View style={subscribedConcertListStyles.itemSeparator} />

const PER_PAGE = 20

export function SubscribedConcertList({
  onPressItem,
  horizontal = true,
  listHeaderComponent,
}: {
  onPressItem: (concertId: string) => void
  horizontal?: boolean
  listHeaderComponent?: React.ComponentType<unknown>
}) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const {
    data: concertListData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    isPending,
    refetch,
  } = useSuspenseInfiniteQuery({
    initialPageParam: 0,
    queryKey: apiClient.queryKeys.subscribe.concert.list(),
    queryFn: ({ pageParam = 0 }) => apiClient.subscribe.getSubscribedConcerts({ offset: pageParam, size: PER_PAGE }),
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
  const listData = useMemo(() => {
    return concertListData?.pages.flat() ?? []
  }, [concertListData])
  const renderItem = useCallback<ListRenderItem<(typeof listData)[number]>>(
    ({ item }) => {
      return (
        <Suspense fallback={<ConcertListItem.Skeleton size={horizontal ? 'small' : 'large'} />}>
          <SubscribedConcertListItem concertId={item.id} onPress={onPressItem} size={horizontal ? 'small' : 'large'} />
        </Suspense>
      )
    },
    [horizontal, onPressItem],
  )

  const onEndReached = useCallback(async () => {
    if (horizontal) {
      return
    }
    if (isFetchingNextPage || isLoading || !hasNextPage || isPending) {
      return
    }
    await fetchNextPage()
  }, [fetchNextPage, hasNextPage, horizontal, isFetchingNextPage, isLoading, isPending])

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }, [refetch])

  return (
    <FlatList
      horizontal={horizontal}
      data={listData}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={subscribedConcertListStyles.contentContainer}
      ListHeaderComponent={listHeaderComponent}
      onEndReached={horizontal ? undefined : onEndReached}
      onRefresh={horizontal ? undefined : onRefresh}
      refreshing={horizontal ? undefined : isRefreshing}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={!horizontal}
    />
  )
}
