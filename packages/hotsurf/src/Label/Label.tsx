import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { Text } from '../Text'

interface LabelProps {
  text: string
  style?: StyleProp<TextStyle>
}

export const Label = ({ text, style }: LabelProps) => (
  <Text weight="bold" style={styles.text}>
    {text}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    marginBottom: 12,
  },
})
