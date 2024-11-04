import { StyleProp, ViewStyle } from 'react-native'
import { ButtonTheme } from '../../button'

export interface IconButtonProps {
  onPress: () => void
  icon: '←' | '✘'
  size?: IconButtonSize
  theme?: ButtonTheme
  style?: StyleProp<ViewStyle>
}

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
