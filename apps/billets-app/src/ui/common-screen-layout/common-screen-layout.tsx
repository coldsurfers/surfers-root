import { colors } from '@coldsurfers/ocean-road'
import { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Edges, SafeAreaView } from 'react-native-safe-area-context'

export const CommonScreenLayout = ({
  children,
  style,
  edges,
}: PropsWithChildren<{
  edges?: Edges
  style?: StyleProp<ViewStyle>
}>) => {
  return (
    <SafeAreaView edges={edges ? edges : ['top']} style={[styles.layout, style]}>
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
