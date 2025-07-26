import { icons as Icons } from 'lucide-react-native';
import { colors } from '../../tokens';
import { StyledIconButtonContainer } from './icon-button.styled';
import type { IconButtonProps } from './icon-button.types';
import { getIconButtonBackgroundStyles, getIconButtonSizeStyles, sizes } from './icon-button.utils';

export const IconButton = ({
  icon,
  onPress,
  theme = 'transparent',
  size = 'md',
  style,
  color,
  strokeWidth,
  fill,
  ...otherProps
}: IconButtonProps) => {
  const TargetIcon = Icons[icon];
  return (
    <StyledIconButtonContainer
      {...otherProps}
      style={[getIconButtonSizeStyles(size), getIconButtonBackgroundStyles(theme), style]}
      onPress={onPress}
    >
      <TargetIcon
        fill={fill}
        size={sizes[size] - 12}
        strokeWidth={strokeWidth ?? 4}
        color={color ?? colors.oc.white.value}
      />
    </StyledIconButtonContainer>
  );
};
