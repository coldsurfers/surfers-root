import styled from '@emotion/styled';
import { icons as Icons } from 'lucide-react';
import { Text } from '../text';
import { colors } from '../tokens/tokens';
import type { ButtonTheme } from './button.types';
import { getButtonBackgroundColor, getButtonForegroundColor } from './button.utils';

export const StyledButton = styled.button<{
  colorTheme: ButtonTheme;
  size: 'lg' | 'md' | 'sm';
}>`
  align-items: center;
  justify-content: center;
  background-color: ${({ colorTheme }) => getButtonBackgroundColor(colorTheme)};
  border: none;
  font-family: inherit;

  padding: ${(props) => {
    switch (props.size) {
      case 'lg':
        return '18px';
      case 'md':
        return '14px';
      default:
        return '10px';
    }
  }};

  border-radius: ${(props) => {
    switch (props.size) {
      case 'lg':
        return '24px';
      case 'md':
        return '22px';
      default:
        return '20px';
    }
  }};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  opacity: ${(props) => (props.colorTheme === 'transparentDarkGray' ? 0.5 : 1.0)};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.75;
  }

  &:active {
    opacity: 0.5;
  }
`;

export const StyledButtonText = styled(Text)<{
  colorTheme: ButtonTheme;
  size: 'lg' | 'md' | 'sm';
  textWeight: 'light' | 'medium' | 'bold';
}>`
  font-weight: ${({ textWeight }) => {
    switch (textWeight) {
      case 'light':
        return '300';
      case 'medium':
        return '500';
      default:
        return '700';
    }
  }};
  color: ${({ colorTheme }) => getButtonForegroundColor(colorTheme)};
  font-family: inherit;
  margin: unset;

  font-size: ${(props) => {
    switch (props.size) {
      case 'lg':
        return '16px';
      case 'md':
        return '14px';
      default:
        return '12px';
    }
  }};
`;

const iconSize = (size: 'lg' | 'md' | 'sm') => {
  switch (size) {
    case 'lg':
      return '18px';
    case 'md':
      return '16px';
    default:
      return '14px';
  }
};

export const createStyledIcon = (
  icon: keyof typeof Icons,
  size: 'lg' | 'md' | 'sm',
  position: 'left' | 'right'
) => {
  const TargetIcon = styled(Icons[icon])`
    color: ${colors.oc.white.value};
  `;

  return (
    <TargetIcon
      size={iconSize(size)}
      strokeWidth={3}
      style={{
        marginLeft: position === 'right' ? 4 : undefined,
        marginRight: position === 'left' ? 4 : undefined,
      }}
    />
  );
};
