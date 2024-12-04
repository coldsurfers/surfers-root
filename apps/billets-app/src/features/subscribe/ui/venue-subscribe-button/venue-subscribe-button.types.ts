import { StyleProp, ViewStyle } from 'react-native'

export type VenueSubscribeButtonProps = {
  venueId: string
  onShouldLogin: () => void
  style?: StyleProp<ViewStyle>
}
