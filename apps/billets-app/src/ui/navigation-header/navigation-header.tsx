import { colors } from '@coldsurfers/ocean-road'
import { IconButton, Text } from '@coldsurfers/ocean-road/native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NAVIGATION_HEADER_HEIGHT } from './navigation-header.constants'

export const NavigationHeader = (props: NativeStackHeaderProps) => {
  const { top: topInset } = useSafeAreaInsets()
  const hideBackButton = useMemo(() => {
    return props.options.headerBackVisible === false
  }, [props.options.headerBackVisible])
  const showRightClose = useMemo(() => {
    return (
      props.options.presentation === 'containedModal' ||
      props.options.presentation === 'containedTransparentModal' ||
      props.options.presentation === 'fullScreenModal' ||
      props.options.presentation === 'modal' ||
      props.options.presentation === 'transparentModal'
    )
  }, [props.options.presentation])
  return (
    <SafeAreaView
      edges={['top']}
      style={{
        height: NAVIGATION_HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: props.options.headerTransparent ? 'transparent' : colors.oc.gray[1].value,
      }}
    >
      {!showRightClose && !hideBackButton && (
        <IconButton
          onPress={() => props.navigation.goBack()}
          theme="transparentDarkGray"
          icon="←"
          style={[styles.rightClose, { top: topInset + 14 }]}
        />
      )}
      {props.options.title && (
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>{props.options.title}</Text>
        </View>
      )}
      {showRightClose && (
        <IconButton
          onPress={() => props.navigation.goBack()}
          theme="transparentDarkGray"
          icon="✘"
          style={[styles.leftClose, { top: topInset + 14 }]}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rightClose: {
    position: 'absolute',
    left: 12,
  },
  headerTitleWrapper: { marginLeft: 'auto', marginRight: 'auto' },
  headerTitle: { fontSize: 16 },
  leftClose: {
    position: 'absolute',
    right: 12,
  },
})
