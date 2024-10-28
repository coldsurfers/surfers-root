import React, { memo } from 'react'
import { StyleSheet, Text as RNText, TextProps } from 'react-native'

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
    // fontFamily: 'NotoSansKR-Thin',
    fontFamily: 'inherit',
  },
  light: {
    // fontFamily: 'NotoSansKR-Light',
    fontFamily: 'inherit',
  },
  regular: {
    // fontFamily: 'NotoSansKR-Regular',
    fontFamily: 'inherit',
  },
  medium: {
    // fontFamily: 'NotoSansKR-Medium',
    fontFamily: 'inherit',
  },
  bold: {
    // fontFamily: 'NotoSansKR-Bold',
    fontFamily: 'inherit',
  },
})

export default memo(Text)
