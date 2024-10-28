import React, { memo } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { variables } from '../lib/tokens/ts/variables'
import { ButtonColorProp } from '../types/button'
import { Text } from '../Text'
import { buttonBackgroundColorStyles } from '../lib/styles'

interface Props {
  onPress: () => void
  icon: '←' | '✘'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: ButtonColorProp
  style?: StyleProp<ViewStyle>
}

const IconButton = ({ icon, onPress, color = 'transparent', size = 'md', style }: Props) => (
  <TouchableOpacity style={[sizeStyles[size], buttonBackgroundColorStyles[color], style]} onPress={onPress}>
    <Text style={baseStyles.text}>{icon}</Text>
  </TouchableOpacity>
)

const sizeStyles = StyleSheet.create({
  xs: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sm: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  md: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  lg: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  xl: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
})

const baseStyles = StyleSheet.create({
  text: {
    color: variables.palette.white,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
})

export default memo(IconButton)
