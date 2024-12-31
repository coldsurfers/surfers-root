import { colors } from '@coldsurfers/ocean-road'
import { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Edges, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export const CommonScreenLayout = ({
  children,
  style,
  edges = [],
}: PropsWithChildren<{
  edges?: Edges
  style?: StyleProp<ViewStyle>
}>) => {
  const { bottom: bottomInset } = useSafeAreaInsets()
  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.layout,
        style,
        {
          /**
           * because we set bottom tab bar as position absolute, so we need to calculate individual bottom inset
           */
          paddingBottom: 85 - bottomInset,
        },
      ]}
    >
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
