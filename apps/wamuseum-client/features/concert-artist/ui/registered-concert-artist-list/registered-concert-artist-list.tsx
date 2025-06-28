import { Text } from '@coldsurfers/ocean-road';
import type { Artist, Maybe } from 'src/__generated__/graphql';
import { RegisteredConcertArtistUI } from '../registered-concert-artist-ui';

export const RegisteredConcertArtistList = ({
  artists,
  concertId,
}: {
  artists: Maybe<Artist>[];
  concertId: string;
}) => {
  if (artists.length === 0) {
    return <Text>등록된 아티스트가 없습니다.</Text>;
  }
  return (
    <>
      {artists.map((artist) => {
        if (!artist) return null;
        const { id } = artist;
        return <RegisteredConcertArtistUI key={id} value={artist} concertId={concertId} />;
      })}
    </>
  );
};
