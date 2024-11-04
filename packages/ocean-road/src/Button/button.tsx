import { forwardRef } from 'react'
import { StyledButton, StyledButtonText } from './button.styled'
import { ButtonProps } from './button.types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ theme = 'indigo', children, ...otherProps }, ref) => {
    return (
      <StyledButton ref={ref} colorTheme={theme} {...otherProps}>
        {typeof children === 'string' ? <StyledButtonText colorTheme={theme}>{children}</StyledButtonText> : children}
      </StyledButton>
    )
  },
)
