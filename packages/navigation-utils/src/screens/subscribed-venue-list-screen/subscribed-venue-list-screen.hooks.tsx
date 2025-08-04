import { useNavigation, useRoute } from '@react-navigation/native';
import type { SubscribedVenueListScreenProps } from './subscribed-venue-list-screen.types';

export const useSubscribedVenueListScreenNavigation = () =>
  useNavigation<SubscribedVenueListScreenProps['navigation']>();
export const useSubscribedVenueListRoute = () =>
  useRoute<SubscribedVenueListScreenProps['route']>();
