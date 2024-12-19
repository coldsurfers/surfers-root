import { Platform, Text as RNText, StyleSheet } from 'react-native'
import { colors } from '../../tokens'
import { TextProps } from './text.types'

export const Text = ({ children, weight = 'regular', style, ...others }: TextProps) => {
  const fontFamilySet = {
    thin: styles.thin,
    light: styles.light,
    regular: styles.regular,
    medium: styles.medium,
    bold: styles.bold,
  }
  const flattenedStyles = StyleSheet.flatten(style)
  const lineHeight = (flattenedStyles?.fontSize ?? 0) * 1.25
  return (
    <RNText
      {...others}
      style={[fontFamilySet[weight], styles.defaultColor, { lineHeight: lineHeight, letterSpacing: 0.24 }, style]}
    >
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  thin: {
    fontFamily: Platform.select({
      ios: 'NotoSansKR-Thin',
      android: 'NotoSansKR-Thin',
      default: 'inherit',
    }),
  },
  light: {
    fontFamily: Platform.select({
      ios: 'NotoSansKR-Light',
      android: 'NotoSansKR-Light',
      default: 'inherit',
    }),
  },
  regular: {
    fontFamily: Platform.select({
      ios: 'NotoSansKR-Regular',
      android: 'NotoSansKR-Regular',
      default: 'inherit',
    }),
  },
  medium: {
    fontFamily: Platform.select({
      ios: 'NotoSansKR-Medium',
      android: 'NotoSansKR-Medium',
      default: 'inherit',
    }),
  },
  bold: {
    fontFamily: Platform.select({
      ios: 'NotoSansKR-Bold',
      android: 'NotoSansKR-Bold',
      default: 'inherit',
    }),
  },
  defaultColor: { color: colors.oc.black.value },
})
