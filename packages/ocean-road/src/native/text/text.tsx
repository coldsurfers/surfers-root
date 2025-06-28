import { Text as RNText, StyleSheet } from 'react-native';
import { colors } from '../../tokens';
import type { TextProps } from './text.types';

export const Text = ({ children, weight = 'regular', style, ...others }: TextProps) => {
  const fontFamilySet = {
    thin: styles.thin,
    light: styles.light,
    regular: styles.regular,
    medium: styles.medium,
    bold: styles.bold,
  };
  const flattenedStyle = StyleSheet.flatten(style);
  const lineHeight = (flattenedStyle?.fontSize ?? 0) * 1.275;
  return (
    <RNText
      {...others}
      style={[
        fontFamilySet[weight],
        styles.defaultColor,
        { lineHeight: lineHeight, letterSpacing: 0.24, includeFontPadding: false },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  thin: {
    fontFamily: 'Pretendard',
    fontWeight: '100',
  },
  light: {
    fontFamily: 'Pretendard',
    fontWeight: '300',
  },
  regular: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
  },
  defaultColor: { color: colors.oc.black.value },
});
