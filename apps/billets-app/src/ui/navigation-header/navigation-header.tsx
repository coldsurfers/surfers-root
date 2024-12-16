import { colors } from '@coldsurfers/ocean-road'
import { IconButton, Text } from '@coldsurfers/ocean-road/native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { ReactNode, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NAVIGATION_HEADER_HEIGHT } from './navigation-header.constants'

export const NavigationHeader = (
  props: NativeStackHeaderProps & {
    searchBarComponent?: ReactNode
  },
) => {
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
      style={[
        styles.safeAreaView,
        {
          height: props.searchBarComponent ? 'auto' : NAVIGATION_HEADER_HEIGHT,
          backgroundColor: props.options.headerTransparent ? 'transparent' : colors.oc.gray[1].value,
        },
      ]}
    >
      <View style={styles.innerContent}>
        {!showRightClose && !hideBackButton && (
          <IconButton
            onPress={() => props.navigation.goBack()}
            theme="transparentDarkGray"
            icon="←"
            style={[styles.rightClose]}
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
            style={[styles.leftClose]}
          />
        )}
      </View>
      {props.searchBarComponent && props.searchBarComponent}
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
  safeAreaView: {
    justifyContent: 'center',
  },
  innerContent: { flexDirection: 'row', alignItems: 'center' },
})
