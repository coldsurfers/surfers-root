import useRemoveConcertVenue from '@/app/concert/[id]/mutations/useRemoveConcertVenue'
import {
  concertVenuesQuery,
  UseConcertVenuesDataT,
  UseConcertVenuesInputT,
} from '@/app/concert/[id]/queries/useConcertVenues'
import { Button } from '@coldsurfers/ocean-road'
import { useCallback } from 'react'

export const DeleteConcertVenueButton = ({ concertId, venueId }: { concertId: string; venueId: string }) => {
  const [mutateRemoveConcertVenue] = useRemoveConcertVenue({})
  const onClick = useCallback(() => {
    mutateRemoveConcertVenue({
      variables: {
        input: {
          concertId,
          venueId,
        },
      },
      update: (cache, { data }) => {
        if (data?.removeConcertVenue.__typename !== 'Venue') {
          return
        }
        const { id: removedConcertVenueId } = data.removeConcertVenue
        const cacheData = cache.readQuery<UseConcertVenuesDataT, UseConcertVenuesInputT>({
          query: concertVenuesQuery,
          variables: {
            concertId,
          },
        })
        if (!cacheData) {
          return
        }
        const { concertVenues } = cacheData
        if (concertVenues.__typename === 'ConcertVenueList') {
          cache.writeQuery({
            query: concertVenuesQuery,
            variables: {
              concertId,
            },
            data: {
              concertVenues: {
                ...concertVenues,
                list: concertVenues.list?.filter((venue) => venue?.id !== removedConcertVenueId),
              },
            },
          })
        }
      },
    })
  }, [concertId, mutateRemoveConcertVenue, venueId])

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
  )
}
