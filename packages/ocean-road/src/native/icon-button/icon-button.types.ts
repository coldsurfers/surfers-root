import { icons } from 'lucide-react-native'
import { TouchableOpacityProps } from 'react-native'
import { ButtonTheme } from '../../button'

export interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof icons
  size?: IconButtonSize
  theme?: ButtonTheme
}

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
