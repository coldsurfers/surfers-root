import type { icons } from 'lucide-react';
import type { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<{
  theme?: ButtonTheme;
  size?: 'lg' | 'md' | 'sm';
  leftIcon?: keyof typeof icons;
  rightIcon?: keyof typeof icons;
  textWeight?: 'light' | 'medium' | 'bold';
}>;

export type ButtonTheme =
  | 'transparent'
  | 'transparentDarkGray'
  | 'white'
  | 'pink'
  | 'indigo'
  | 'border';
