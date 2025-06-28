import { useNavigation, useRoute } from '@react-navigation/native';
import type { ArtistDetailScreenProp } from './artist-detail-screen.types';

export const useArtistDetailScreenNavigation = () =>
  useNavigation<ArtistDetailScreenProp['navigation']>();

export const useArtistDetailScreenRoute = () => useRoute<ArtistDetailScreenProp['route']>();
