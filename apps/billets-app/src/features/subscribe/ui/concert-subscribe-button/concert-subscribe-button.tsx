import { colors } from '@coldsurfers/ocean-road'
import { IconButton } from '@coldsurfers/ocean-road/native'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

export const ConcertSubscribeButton = ({
  onPress,
  isSubscribed,
  style,
}: {
  onPress?: () => void
  isSubscribed: boolean
  style?: StyleProp<ViewStyle>
}) => {
  return (
    <IconButton
      onPress={onPress}
      style={[styles.bgColor, style]}
      icon={'Heart'}
      size="lg"
      color={colors.oc.cyan[9].value}
      strokeWidth={isSubscribed ? 1 : 2.5}
      fill={isSubscribed ? colors.oc.cyan[9].value : 'transparent'}
    />
  )
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: colors.oc.gray[4].value,
  },
})
