import type { ArtistStackScreenProp } from '../../navigations/artist-stack-navigation';

export type ArtistDetailScreenParam = {
  artistId: string;
};
export type ArtistDetailScreenProp = ArtistStackScreenProp<'ArtistDetailScreen'>;
