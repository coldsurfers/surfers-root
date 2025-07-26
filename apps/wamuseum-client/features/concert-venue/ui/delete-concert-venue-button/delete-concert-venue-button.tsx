import { Button } from '@coldsurfers/ocean-road';
import { useCallback } from 'react';
import {
  ConcertVenuesDocument,
  type ConcertVenuesQuery,
  type ConcertVenuesQueryVariables,
  useRemoveConcertVenueMutation,
} from 'src/__generated__/graphql';

export const DeleteConcertVenueButton = ({
  concertId,
  venueId,
}: { concertId: string; venueId: string }) => {
  const [mutateRemoveConcertVenue] = useRemoveConcertVenueMutation({});
  const onClick = useCallback(() => {
    mutateRemoveConcertVenue({
      variables: {
        input: {
          concertId,
          venueId,
        },
      },
      update: (cache, { data }) => {
        if (data?.removeConcertVenue?.__typename !== 'Venue') {
          return;
        }
        const { id: removedConcertVenueId } = data.removeConcertVenue;
        const concertVenuesCache = cache.readQuery<ConcertVenuesQuery, ConcertVenuesQueryVariables>(
          {
            query: ConcertVenuesDocument,
            variables: {
              concertId,
            },
          }
        );
        if (!concertVenuesCache) {
          return;
        }
        if (concertVenuesCache.concertVenues?.__typename === 'ConcertVenueList') {
          cache.writeQuery({
            query: ConcertVenuesDocument,
            variables: {
              concertId,
            },
            data: {
              concertVenues: {
                ...concertVenuesCache.concertVenues,
                list: concertVenuesCache.concertVenues.list?.filter(
                  (venue) => venue?.id !== removedConcertVenueId
                ),
              },
            },
          });
        }
      },
    });
  }, [concertId, mutateRemoveConcertVenue, venueId]);

  return (
    <Button
      style={{
        marginLeft: 'auto',
      }}
      theme={'pink'}
      onClick={onClick}
    >
      삭제하기
    </Button>
  );
};
