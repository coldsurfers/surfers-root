import color from '@coldsurfers/ocean-road-design-tokens/dist/js/color/variables';
import styled from '@emotion/native';
import { Text } from '../text';
import type { ToastType } from './toast.types';

export const StyledToastContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: transparent;
  position: absolute;
  bottom: 24px;
  left: 0px;
  right: 0px;
`;

export const StyledToastPressable = styled.Pressable<{ type: ToastType }>`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 24px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'info':
        return color.oc.black.value;
      case 'warning':
        return color.oc.yellow[9].value;
      case 'error':
        return color.oc.pink[9].value;
      default:
        return color.oc.black.value;
    }
  }};
`;

export const StyledToastText = styled(Text)`
  font-weight: 700;
  color: ${color.oc.white.value};
  font-size: 14px;
`;
