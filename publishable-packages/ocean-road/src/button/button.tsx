import type { icons as Icons } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import {
  StyledButton,
  StyledButtonText,
  StyledIconWrapper,
  createStyledIcon,
} from './button.styled';
import type { ButtonProps } from './button.types';

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      theme = 'indigo',
      leftIcon,
      rightIcon,
      textWeight = 'medium',
      size = 'md',
      children,
      ...otherProps
    },
    ref
  ) => {
    return (
      <StyledButton ref={ref} colorTheme={theme} size={size} {...otherProps}>
        {typeof children === 'string' ? (
          <>
            {typeof leftIcon === 'string' ? (
              createStyledIcon(leftIcon as keyof typeof Icons, size, 'left')
            ) : (
              <StyledIconWrapper $position="left">{leftIcon}</StyledIconWrapper>
            )}
            <StyledButtonText size={size} textWeight={textWeight} colorTheme={theme}>
              {children}
            </StyledButtonText>
            {typeof rightIcon === 'string' ? (
              createStyledIcon(rightIcon as keyof typeof Icons, size, 'right')
            ) : (
              <StyledIconWrapper $position="right">{rightIcon}</StyledIconWrapper>
            )}
          </>
        ) : (
          children
        )}
      </StyledButton>
    );
  }
);
