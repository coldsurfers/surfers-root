import { useCallback, useMemo } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import useGetMeQuery from '../../../../lib/react-query/queries/useGetMeQuery'
import useSubscribedConcertListQuery from '../../../../lib/react-query/queries/useSubscribedConcertListQuery'
import { SubscribedConcertListItem } from '../subscribed-concert-list-item'

const ItemSeparator = () => <View style={styles.itemSeparator} />

export function SubscribedConcertList({ onPressItem }: { onPressItem: (concertId: string) => void }) {
  const { data: meData } = useGetMeQuery()
  const { data: concertListData } = useSubscribedConcertListQuery({
    enabled: !!meData,
  })
  const listData = useMemo(() => {
    return concertListData?.pages.flatMap((page) => page).filter((v) => !!v) ?? []
  }, [concertListData])
  const renderItem = useCallback<ListRenderItem<(typeof listData)[number]>>(
    (info) => {
      return <SubscribedConcertListItem concertId={info.item.concertId} onPress={onPressItem} />
    },
    [onPressItem],
  )

  return (
    <FlatList
      horizontal
      data={listData}
      keyExtractor={(item, index) => `${item.concertId}-${index}`}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.contentContainer}
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
