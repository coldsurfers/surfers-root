import { Text } from '@coldsurfers/hotsurf'
import { PropsWithChildren, useContext } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { ThemeContext } from '../lib/registries/ThemeContextRegistry'

const Paragraph = ({
  children,
  style,
  ...otherProps
}: PropsWithChildren<{
  style?: StyleProp<TextStyle>
}>) => {
  const baseStyles: StyleProp<TextStyle> = {
    fontFamily: 'Noto Sans KR',
  }
  const { theme } = useContext(ThemeContext)
  return (
    <Text
      style={[
        baseStyles,
        style,
        { color: theme === 'light' ? '#000000' : '#ffffff' },
      ]}
      {...otherProps}
    >
      {children}
    </Text>
  )
}

export default Paragraph
