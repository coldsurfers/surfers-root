import { type ElementRef, forwardRef } from 'react';
import type { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import type { ButtonProps } from '../../button/button.types';
import { StyledButton, StyledButtonText, createStyledIconNative } from './button.styled';

export const Button = forwardRef<
  ElementRef<typeof TouchableOpacity>,
  ButtonProps & TouchableOpacityProps
>(
  (
    { children, onPress, theme = 'indigo', size = 'lg', leftIcon, rightIcon, ...otherProps },
    ref
  ) => (
    <StyledButton ref={ref} onPress={onPress} colorTheme={theme} size={size} {...otherProps}>
      {leftIcon && typeof leftIcon === 'string'
        ? createStyledIconNative(leftIcon, size, 'left')
        : leftIcon}
      {typeof children === 'string' ? (
        <StyledButtonText colorTheme={theme} size={size}>
          {children}
        </StyledButtonText>
      ) : (
        children
      )}
    </StyledButton>
  )
);
