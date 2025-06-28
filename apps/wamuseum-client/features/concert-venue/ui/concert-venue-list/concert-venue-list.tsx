import { Text } from '@coldsurfers/ocean-road';
import type { Maybe, Venue } from 'src/__generated__/graphql';
import { DeleteConcertVenueButton } from '../delete-concert-venue-button';

export const ConcertVenueList = ({
  venues,
  concertId,
}: { venues: Maybe<Venue>[]; concertId: string }) => {
  if (venues.length === 0) {
    return <Text>등록된 공연장소가 없습니다.</Text>;
  }
  return (
    <>
      {venues.map((venue) => {
        if (!venue) return null;
        const { id, name } = venue;
        return (
          <div key={id} style={{ display: 'flex', alignItems: 'center' }}>
            <Text>{name}</Text>
            <DeleteConcertVenueButton concertId={concertId} venueId={id} />
          </div>
        );
      })}
    </>
  );
};
