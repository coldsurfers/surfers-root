import { icons } from 'lucide-react-native'
import { ColorValue, TouchableOpacityProps } from 'react-native'
import { ButtonTheme } from '../../button'

export interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof icons
  size?: IconButtonSize
  theme?: ButtonTheme
  color?: ColorValue
  strokeWidth?: number
  fill?: ColorValue
}

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
