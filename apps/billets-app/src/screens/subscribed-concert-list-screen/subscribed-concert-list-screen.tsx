import { SubscribedConcertList } from '@/features'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { Text } from '@coldsurfers/ocean-road/native'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSubscribedConcertListScreenNavigation } from './subscribed-concert-list-screen.hooks'

const ListHeaderComponent = () => {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>찜한 공연</Text>
    </View>
  )
}

export const SubscribedConcertListScreen = () => {
  const { top: topInset } = useSafeAreaInsets()
  const navigation = useSubscribedConcertListScreenNavigation()
  const onPressItem = useCallback(
    (concertId: string) => {
      navigation.navigate('ConcertStackScreen', {
        screen: 'ConcertDetailScreen',
        params: {
          concertId,
        },
      })
    },
    [navigation],
  )
  return (
    <CommonScreenLayout>
      <SubscribedConcertList horizontal={false} listHeaderComponent={ListHeaderComponent} onPressItem={onPressItem} />
      <CommonBackIconButton top={topInset} onPress={() => navigation.goBack()} />
    </CommonScreenLayout>
  )
}

const styles = StyleSheet.create({
  listHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  listHeaderText: { fontSize: 16 },
})
