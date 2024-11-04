import { ActivityIndicator, ColorValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
  positionCenter?: boolean
  size?: number | 'small' | 'large'
  color?: ColorValue
  style?: StyleProp<ViewStyle>
}

export const Spinner = ({ positionCenter = true, size = 'large', color, style }: Props) => (
  <View style={[positionCenter && styles.positionCenter, style]}>
    <ActivityIndicator size={size} color={color} />
  </View>
)

const styles = StyleSheet.create({
  positionCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
