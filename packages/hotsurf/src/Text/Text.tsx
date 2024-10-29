import { memo } from 'react'
import { Platform, Text as RNText, StyleSheet, TextProps } from 'react-native'

interface Props extends TextProps {
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'bold'
}

const Text = ({ children, weight = 'regular', style, ...others }: Props) => {
  const fontFamilySet = {
    thin: styles.thin,
    light: styles.light,
    regular: styles.regular,
    medium: styles.medium,
    bold: styles.bold,
  }
  return (
    <RNText {...others} style={[fontFamilySet[weight], style]}>
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
})

export default memo(Text)
