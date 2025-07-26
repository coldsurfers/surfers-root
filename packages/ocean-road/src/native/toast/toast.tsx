import { useCallback } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { StyledToastContainer, StyledToastPressable, StyledToastText } from './toast.styled';
import type { ToastProps } from './toast.types';

export const Toast = ({ type, message, onPress }: ToastProps) => {
  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (onPress) {
        onPress(e);
      }
    },
    [onPress]
  );

  return (
    <StyledToastContainer>
      <StyledToastPressable type={type} onPress={handlePress}>
        <StyledToastText>{message}</StyledToastText>
      </StyledToastPressable>
    </StyledToastContainer>
  );
};
