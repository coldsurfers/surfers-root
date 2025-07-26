import type { StyleProp, ViewStyle } from 'react-native';

export const getConcertListItemWrapperDynamicStyles = (
  size: 'small' | 'large'
): StyleProp<ViewStyle> => {
  return {
    width: size === 'small' ? 140 : '50%',
    // padding: size === 'small' ? 0 : 6,
  };
};

export const getConcertListBottomWrapperDynamicStyles = (size: 'small' | 'large') => {
  return {
    marginTop: size === 'small' ? 6 : 10,
    marginBottom: size === 'small' ? 4 : 6,
  };
};
