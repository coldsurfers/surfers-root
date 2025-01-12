import { apiClient } from '@/lib/api/openapi-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import format from 'date-fns/format'
import { useMemo } from 'react'
import { ConcertListItem } from '../../../concert/ui'

export function SubscribedConcertListItem({
  concertId,
  onPress,
  size = 'small',
}: {
  concertId: string
  onPress: (concertId: string) => void
  size?: 'small' | 'large'
}) {
  const { data: concertData } = useSuspenseQuery({
    queryKey: apiClient.queryKeys.concert.detail(concertId),
    queryFn: () => apiClient.concert.getConcertDetail(concertId),
  })

  const date = useMemo(() => {
    if (!concertData) {
      return ''
    }
    return format(concertData.date ? new Date(concertData.date) : new Date(), 'EEE, MMM d')
  }, [concertData])

  if (!concertData) {
    return null
  }

  return (
    <ConcertListItem concertId={concertData.id} title={concertData.title} date={date} onPress={onPress} size={size} />
  )
}
