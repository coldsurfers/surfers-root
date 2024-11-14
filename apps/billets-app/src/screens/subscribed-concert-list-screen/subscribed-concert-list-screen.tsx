import { SubscribedConcertList } from '@/features'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { Text } from '@coldsurfers/ocean-road/native'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ListHeaderComponent = () => {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>찜한 공연</Text>
    </View>
  )
}

export const SubscribedConcertListScreen = () => {
  const { top: topInset } = useSafeAreaInsets()
  return (
    <CommonScreenLayout>
      <SubscribedConcertList horizontal={false} listHeaderComponent={ListHeaderComponent} onPressItem={() => {}} />
      <CommonBackIconButton top={topInset} />
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
