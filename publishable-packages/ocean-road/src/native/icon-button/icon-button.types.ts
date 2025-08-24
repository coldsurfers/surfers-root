import type { icons } from 'lucide-react-native';
import type { ColorValue, TouchableOpacityProps } from 'react-native';
import type { ButtonTheme } from '../../button';

export interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof icons;
  size?: IconButtonSize;
  theme?: ButtonTheme;
  color?: ColorValue;
  strokeWidth?: number;
  fill?: ColorValue;
}

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
