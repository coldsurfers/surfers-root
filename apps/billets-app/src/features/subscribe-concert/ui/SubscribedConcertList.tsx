import { FlatList, StyleSheet, View } from 'react-native'
import useGetMeQuery from '../../../lib/hooks/queries/useGetMeQuery'
import useSubscribedConcertListQuery from '../../../lib/hooks/queries/useSubscribedConcertListQuery'
import { useMemo } from 'react'
import SubscribedConcertListItem from './SubscribedConcertListItem'

const ItemSeparator = () => <View style={styles.itemSeparator} />

export default function SubscribedConcertList({ onPressItem }: { onPressItem: (concertId: string) => void }) {
  const { data: meData } = useGetMeQuery()
  const { data: concertListData } = useSubscribedConcertListQuery({
    enabled: !!meData,
  })
  const listData = useMemo(() => {
    return concertListData?.pages.flatMap((page) => page).filter((v) => !!v) ?? []
  }, [concertListData])

  return (
    <FlatList
      horizontal
      data={listData}
      keyExtractor={(item, index) => `${item.concertId}-${index}`}
      renderItem={(info) => {
        return <SubscribedConcertListItem concertId={info.item.concertId} onPress={onPressItem} />
      }}
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
