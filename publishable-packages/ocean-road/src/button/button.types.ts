import type { icons } from 'lucide-react';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';

export type ButtonProps = PropsWithChildren<{
  theme?: ButtonTheme;
  size?: 'lg' | 'md' | 'sm';
  leftIcon?: keyof typeof icons | ReactElement;
  rightIcon?: keyof typeof icons | ReactElement;
  textWeight?: 'light' | 'medium' | 'bold';
}>;

export type ButtonTheme =
  | 'transparent'
  | 'transparentDarkGray'
  | 'white'
  | 'pink'
  | 'indigo'
  | 'border';
