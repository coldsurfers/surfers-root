import type { icons as Icons } from 'lucide-react-native';
import { type ElementRef, forwardRef } from 'react';
import type { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import type { ButtonProps } from '../../button/button.types';
import {
  StyledButton,
  StyledButtonText,
  StyledIconWrapper,
  createStyledIconNative,
} from './button.styled';

export const Button = forwardRef<
  ElementRef<typeof TouchableOpacity>,
  ButtonProps & TouchableOpacityProps
>(
  (
    { children, onPress, theme = 'indigo', size = 'lg', leftIcon, rightIcon, ...otherProps },
    ref
  ) => (
    <StyledButton ref={ref} onPress={onPress} colorTheme={theme} size={size} {...otherProps}>
      {leftIcon && typeof leftIcon === 'string' ? (
        createStyledIconNative(leftIcon as keyof typeof Icons, size, 'left')
      ) : (
        <StyledIconWrapper $position="left">{leftIcon}</StyledIconWrapper>
      )}
      {typeof children === 'string' ? (
        <StyledButtonText colorTheme={theme} size={size}>
          {children}
        </StyledButtonText>
      ) : (
        children
      )}
      {rightIcon && typeof rightIcon === 'string' ? (
        createStyledIconNative(rightIcon as keyof typeof Icons, size, 'right')
      ) : (
        <StyledIconWrapper $position="right">{rightIcon}</StyledIconWrapper>
      )}
    </StyledButton>
  )
);
