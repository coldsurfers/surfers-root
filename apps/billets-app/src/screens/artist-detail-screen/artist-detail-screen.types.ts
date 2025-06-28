import type { ArtistStackScreenProp } from '@/navigations/artist-stack-navigation/artist-stack-navigation.types';

export type ArtistDetailScreenParam = {
  artistId: string;
};
export type ArtistDetailScreenProp = ArtistStackScreenProp<'ArtistDetailScreen'>;
