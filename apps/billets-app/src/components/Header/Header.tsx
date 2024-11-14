import { colors } from '@coldsurfers/ocean-road'
import { IconButton, Text } from '@coldsurfers/ocean-road/native'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StatusBar, StatusBarStyle, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  statusBarStyle?: StatusBarStyle
  title: string
}

const Header = ({ statusBarStyle, title }: Props) => {
  const { top } = useSafeAreaInsets()
  const { goBack, canGoBack } = useNavigation()
  const onPressBackButton = useCallback(() => {
    if (canGoBack()) {
      goBack()
    }
  }, [canGoBack, goBack])

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />
      <View style={[styles.header, { paddingTop: top }]}>
        <View style={[styles.innerPosition]}>
          <IconButton theme="pink" onPress={onPressBackButton} icon="←" style={styles.backButton} />
          <Text style={[styles.title]}>{title}</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.oc.white.value,
  },
  innerPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: colors.oc.black.value,
    fontWeight: '700',
    lineHeight: 24,
  },
  backButton: {
    marginRight: 10,
    zIndex: 1,
    color: colors.oc.black.value,
  },
})

export default Header
