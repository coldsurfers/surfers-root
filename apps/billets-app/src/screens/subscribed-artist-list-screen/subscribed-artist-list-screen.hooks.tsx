import { useNavigation, useRoute } from '@react-navigation/native';
import type { SubscribedArtistListScreenProps } from './subscribed-artist-list-screen.types';

export const useSubscribedArtistListScreenNavigation = () =>
  useNavigation<SubscribedArtistListScreenProps['navigation']>();
export const useSubscribedArtistListRoute = () =>
  useRoute<SubscribedArtistListScreenProps['route']>();
