import { ConcertListItem } from '@/features/concert'
import { Suspense, useCallback, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import useSubscribedConcertListQuery from '../../../../lib/react-query/queries/useSubscribedConcertListQuery'
import { SubscribedConcertListItem } from '../subscribed-concert-list-item'
import { subscribedConcertListStyles } from './subscribed-concert-list.styles'

const ItemSeparator = () => <View style={subscribedConcertListStyles.itemSeparator} />

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
  } = useSubscribedConcertListQuery()
  const listData = useMemo(() => {
    return concertListData?.pages.flatMap((page) => page).filter((v) => !!v) ?? []
  }, [concertListData])
  const renderItem = useCallback<ListRenderItem<(typeof listData)[number]>>(
    (info) => {
      return (
        <Suspense fallback={<ConcertListItem.Skeleton size={horizontal ? 'small' : 'large'} />}>
          <SubscribedConcertListItem
            concertId={info.item.concertId}
            onPress={onPressItem}
            size={horizontal ? 'small' : 'large'}
          />
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
      keyExtractor={(item, index) => `${item.concertId}-${index}`}
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
