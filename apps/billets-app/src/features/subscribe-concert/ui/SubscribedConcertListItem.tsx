import format from 'date-fns/format'
import { useMemo } from 'react'
import useConcertQuery from '../../../lib/react-query/queries/useConcertQuery'
import { ConcertListItem } from '../../concert/ui'

export default function SubscribedConcertListItem({
  concertId,
  onPress,
}: {
  concertId: string
  onPress: (concertId: string) => void
}) {
  const { data: concertData } = useConcertQuery({
    concertId,
  })

  const date = useMemo(() => {
    if (!concertData) {
      return ''
    }
    return format(new Date(concertData.date), 'EEE, MMM d')
  }, [concertData])

  if (!concertData) {
    return null
  }

  return (
    <ConcertListItem
      concertId={concertData.id}
      thumbnailUrl={concertData.posters.at(0)?.imageUrl ?? ''}
      title={concertData.title}
      date={date}
      venue={concertData.venues.at(0)?.venueTitle}
      onPress={onPress}
      size="small"
    />
  )
}
