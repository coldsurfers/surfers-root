import { useCallback, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import useGetMeQuery from '../../../../lib/react-query/queries/useGetMeQuery'
import useSubscribedConcertListQuery from '../../../../lib/react-query/queries/useSubscribedConcertListQuery'
import { SubscribedConcertListItem } from '../subscribed-concert-list-item'

const ItemSeparator = () => <View style={styles.itemSeparator} />

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
  const { data: meData } = useGetMeQuery()
  const {
    data: concertListData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    isPending,
    refetch,
  } = useSubscribedConcertListQuery({
    enabled: !!meData,
  })
  const listData = useMemo(() => {
    return concertListData?.pages.flatMap((page) => page).filter((v) => !!v) ?? []
  }, [concertListData])
  const renderItem = useCallback<ListRenderItem<(typeof listData)[number]>>(
    (info) => {
      return (
        <SubscribedConcertListItem
          concertId={info.item.concertId}
          onPress={onPressItem}
          size={horizontal ? 'small' : 'large'}
        />
      )
    },
    [horizontal, onPressItem],
  )

  return (
    <FlatList
      horizontal={horizontal}
      data={listData}
      keyExtractor={(item, index) => `${item.concertId}-${index}`}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={listHeaderComponent}
      onEndReached={async () => {
        if (horizontal) {
          return
        }
        if (isFetchingNextPage || isLoading || !hasNextPage || isPending) {
          return
        }
        await fetchNextPage()
      }}
      onRefresh={async () => {
        setIsRefreshing(true)
        await refetch()
        setIsRefreshing(false)
      }}
      refreshing={isRefreshing}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  itemSeparator: {
    width: 10,
  },
})
