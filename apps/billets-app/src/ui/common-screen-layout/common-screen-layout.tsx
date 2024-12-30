import { colors } from '@coldsurfers/ocean-road'
import { Spinner } from '@coldsurfers/ocean-road/native'
import { PropsWithChildren, Suspense } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Edges, SafeAreaView } from 'react-native-safe-area-context'

export const CommonScreenLayout = ({
  children,
  style,
  edges = [],
}: PropsWithChildren<{
  edges?: Edges
  style?: StyleProp<ViewStyle>
}>) => {
  return (
    <Suspense fallback={<Spinner positionCenter />}>
      <SafeAreaView edges={edges} style={[styles.layout, style]}>
        {children}
      </SafeAreaView>
    </Suspense>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.oc.gray[1].value,
  },
})
