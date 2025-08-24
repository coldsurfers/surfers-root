import type { PropsWithChildren } from 'react';
import type { GestureResponderEvent } from 'react-native';

export type ModalProps = PropsWithChildren<{
  visible?: boolean;
  transparent?: boolean;
  onPressBackground?: (event: GestureResponderEvent) => void;
}>;
