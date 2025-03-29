import { Spinner, useColorScheme } from '@coldsurfers/ocean-road/native'
import { View } from 'react-native'

export const GlobalSuspenseFallback = () => {
  const { semantics } = useColorScheme()

  return (
    <View style={{ flex: 1, backgroundColor: semantics.background[3], alignItems: 'center', justifyContent: 'center' }}>
      <Spinner />
    </View>
  )
}
