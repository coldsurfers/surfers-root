import { SubscribedConcertList } from '@/features'
import { CommonScreenLayout } from '@/ui'
import { Text } from '@coldsurfers/ocean-road/native'
import { StyleSheet, View } from 'react-native'

const ListHeaderComponent = () => {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>찜한 공연</Text>
    </View>
  )
}

export const SubscribedConcertListScreen = () => {
  return (
    <CommonScreenLayout>
      <SubscribedConcertList horizontal={false} listHeaderComponent={ListHeaderComponent} onPressItem={() => {}} />
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
