import React, { memo, useCallback } from 'react'
import { GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native'
import { variables } from '../lib/tokens/ts/variables'
import { Text } from '../Text'

interface Props {
  type: 'info' | 'warning' | 'error'
  message: string
  onPress?: (event: GestureResponderEvent) => void
  autoCloseOnPress?: boolean
}

const Toast = ({ type, message, onPress }: Props) => {
  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (onPress) {
        onPress(e)
      }
    },
    [onPress],
  )

  return (
    <View style={baseStyles.wrapper}>
      <Pressable onPress={handlePress} style={[backgroundColorStyles[type], baseStyles.button]}>
        <Text style={[baseStyles.text, textColorStyles[type]]}>{message}</Text>
      </Pressable>
    </View>
  )
}

const baseStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '700',
    color: variables.palette.white,
  },
  button: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 24,
  },
})

const backgroundColorStyles = StyleSheet.create({
  info: {
    backgroundColor: variables.palette.black,
  },
  warning: {
    backgroundColor: variables.palette.yellow,
  },
  error: {
    backgroundColor: variables.palette.pink,
  },
})

const textColorStyles = StyleSheet.create({
  info: {
    color: variables.palette.white,
  },
  warning: {
    color: variables.palette.white,
  },
  error: {
    color: variables.palette.white,
  },
})

export default memo(Toast)
