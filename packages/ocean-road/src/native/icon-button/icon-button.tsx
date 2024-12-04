import { TouchableOpacity } from 'react-native'
import { StyledIconButtonText } from './icon-button.styled'
import { IconButtonProps } from './icon-button.types'
import { getIconButtonBackgroundStyles, getIconButtonSizeStyles } from './icon-button.utils'

export const IconButton = ({
  icon,
  onPress,
  theme = 'transparent',
  size = 'md',
  style,
  ...otherProps
}: IconButtonProps) => (
  <TouchableOpacity
    {...otherProps}
    style={[getIconButtonSizeStyles(size), getIconButtonBackgroundStyles(theme), style]}
    onPress={onPress}
  >
    <StyledIconButtonText>{icon}</StyledIconButtonText>
  </TouchableOpacity>
)
