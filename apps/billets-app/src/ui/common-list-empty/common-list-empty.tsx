import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { StyleSheet, Text, View } from 'react-native'

export function CommonListEmpty({ emptyText }: { emptyText: string }) {
  const { semantics } = useColorScheme()
  return (
    <View style={styles.emptyWrapper}>
      <Text style={[styles.emptyDesc, { color: semantics.foreground[1] }]}>{emptyText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyDesc: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
