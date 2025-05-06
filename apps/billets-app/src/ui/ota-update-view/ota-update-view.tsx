import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CommonScreenLayout } from '../common-screen-layout'

export const OtaUpdateView = ({ updateProgressPercentage }: { updateProgressPercentage: number }) => {
  return (
    <SafeAreaProvider>
      <CommonScreenLayout style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 }}>
        <FastImage
          source={require('assets/bootsplash/logo.png')}
          style={{
            width: 124,
            height: 124,
            borderRadius: 62,
          }}
        />
        <View style={{ marginTop: 36, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '100%', backgroundColor: colors.oc.white.value, height: 24, borderRadius: 8 }}>
            <View
              style={{
                width: `${updateProgressPercentage}%`,
                backgroundColor: colors.oc.indigo[8].value,
                height: '100%',
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ marginTop: 24 }}>
            <Text weight="medium" style={{ fontSize: 18 }}>
              {updateProgressPercentage}
            </Text>
          </View>
        </View>
      </CommonScreenLayout>
    </SafeAreaProvider>
  )
}
