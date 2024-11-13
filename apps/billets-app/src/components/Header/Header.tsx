import React, { useCallback } from 'react'
import { StatusBar, StatusBarStyle, StyleSheet, View } from 'react-native'
import { IconButton, palette, Text } from 'fstvllife-design-system'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

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
          <IconButton color="pink" onPress={onPressBackButton} icon="←" style={styles.backButton} />
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
    backgroundColor: palette.white,
  },
  innerPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: palette.black,
    fontWeight: '700',
    lineHeight: 24,
  },
  backButton: {
    marginRight: 10,
    zIndex: 1,
    color: palette.black,
  },
})

export default Header
