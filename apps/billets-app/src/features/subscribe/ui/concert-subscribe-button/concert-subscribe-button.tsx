import { Button } from '@coldsurfers/ocean-road/native'
import { StyleProp, ViewStyle } from 'react-native'

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
    <Button size="sm" theme="border" onPress={onPress} style={style}>
      {isSubscribed ? 'Following' : 'Follow'}
    </Button>
  )
}
