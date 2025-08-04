import { useNavigation, useRoute } from '@react-navigation/native';
import type { VenueDetailScreenProp } from './venue-detail-screen.types';

export const useVenueDetailScreenNavigation = () =>
  useNavigation<VenueDetailScreenProp['navigation']>();
export const useVenueDetailScreenRoute = () => useRoute<VenueDetailScreenProp['route']>();
