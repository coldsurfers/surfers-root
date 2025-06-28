import type { StyleProp, ViewStyle } from 'react-native';

export type ArtistSubscribeButtonProps = {
  artistId: string;
  onShouldLogin: () => void;
  size?: 'lg' | 'md' | 'sm';
  style?: StyleProp<ViewStyle>;
};
