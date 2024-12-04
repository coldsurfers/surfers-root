import { StyleProp, ViewStyle } from 'react-native'

export type ArtistSubscribeButtonProps = {
  artistId: string
  onShouldLogin: () => void
  style?: StyleProp<ViewStyle>
}
