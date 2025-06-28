import type { GestureResponderEvent } from 'react-native';

export interface ToastProps {
  type: ToastType;
  message: string;
  onPress?: (event: GestureResponderEvent) => void;
  autoCloseOnPress?: boolean;
}

export type ToastType = 'info' | 'warning' | 'error';
