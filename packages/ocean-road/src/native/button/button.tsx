import { TouchableOpacityProps } from 'react-native'
import { ButtonProps } from '../../button/button.types'
import { StyledButton, StyledButtonText } from './button.styled'

export const Button = ({ children, onPress, theme = 'indigo', ...otherProps }: ButtonProps & TouchableOpacityProps) => (
  <StyledButton onPress={onPress} colorTheme={theme} {...otherProps}>
    {typeof children === 'string' ? <StyledButtonText colorTheme={theme}>{children}</StyledButtonText> : children}
  </StyledButton>
)
