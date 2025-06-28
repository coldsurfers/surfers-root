import type { StyleProp, ViewStyle } from 'react-native';

export type VenueSubscribeButtonProps = {
  venueId: string;
  onShouldLogin: () => void;
  size?: 'lg' | 'md' | 'sm';
  style?: StyleProp<ViewStyle>;
};
