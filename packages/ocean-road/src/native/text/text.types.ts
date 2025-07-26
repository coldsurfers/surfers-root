import type { TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'bold';
}
