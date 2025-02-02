import { ButtonHTMLAttributes, forwardRef } from 'react'
import { createStyledIcon, StyledButton, StyledButtonText } from './button.styled'
import { ButtonProps } from './button.types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ theme = 'indigo', leftIcon, rightIcon, textWeight = 'medium', size = 'md', children, ...otherProps }, ref) => {
    return (
      <StyledButton ref={ref} colorTheme={theme} size={size} {...otherProps}>
        {typeof children === 'string' ? (
          <>
            {leftIcon && createStyledIcon(leftIcon, size, 'left')}
            <StyledButtonText size={size} textWeight={textWeight} colorTheme={theme}>
              {children}
            </StyledButtonText>
            {rightIcon && createStyledIcon(rightIcon, size, 'right')}
          </>
        ) : (
          children
        )}
      </StyledButton>
    )
  },
)
