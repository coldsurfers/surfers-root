import { ElementRef, forwardRef } from 'react'
import { TouchableOpacityProps, type TouchableOpacity } from 'react-native'
import { ButtonProps } from '../../button/button.types'
import { StyledButton, StyledButtonText } from './button.styled'

export const Button = forwardRef<ElementRef<typeof TouchableOpacity>, ButtonProps & TouchableOpacityProps>(
  ({ children, onPress, theme = 'indigo', size = 'lg', ...otherProps }, ref) => (
    <StyledButton ref={ref} onPress={onPress} colorTheme={theme} size={size} {...otherProps}>
      {typeof children === 'string' ? (
        <StyledButtonText colorTheme={theme} size={size}>
          {children}
        </StyledButtonText>
      ) : (
        children
      )}
    </StyledButton>
  ),
)
