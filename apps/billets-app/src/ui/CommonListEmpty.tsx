import { View, Text, StyleSheet } from 'react-native'

export default function CommonListEmpty({ emptyText }: { emptyText: string }) {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyDesc}>{emptyText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyDesc: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
})
