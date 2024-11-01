'use client'

import { Text } from '@coldsurfers/hotsurf'
import { useColorScheme } from '@coldsurfers/ocean-road'
import { PropsWithChildren } from 'react'
import { StyleProp, TextStyle } from 'react-native'

export const Paragraph = ({
  children,
  style,
  ...otherProps
}: PropsWithChildren<{
  style?: StyleProp<TextStyle>
}>) => {
  const baseStyles: StyleProp<TextStyle> = {
    fontFamily: 'Noto Sans KR',
  }
  const theme = useColorScheme()
  return (
    <Text style={[baseStyles, style, { color: theme.name === 'lightMode' ? '#000000' : '#ffffff' }]} {...otherProps}>
      {children}
    </Text>
  )
}
