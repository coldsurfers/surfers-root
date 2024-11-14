import { colors } from '@coldsurfers/ocean-road'
import { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const CommonScreenLayout = ({
  children,
  style,
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>
}>) => {
  return (
    <SafeAreaView edges={['top']} style={[styles.layout, style]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.oc.gray[1].value,
  },
})
