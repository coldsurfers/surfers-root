'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { useMemo } from 'react'
import { components } from 'types/api'
import {
  StyledRecentListBilletsConcertCard,
  StyledRecentListBilletsConcertCardImage,
  StyledRecentListParagraph,
  StyledTitle,
} from './recent-concert-list.styled'

export const RecentConcertListItem = ({ concert }: { concert: components['schemas']['ConcertDTOSchema'] }) => {
  const { data: posters } = useQuery({
    queryKey: apiClient.poster.queryKeys.list.byConcertId(concert.id),
    queryFn: () => apiClient.poster.getPostersByConcertId(concert.id),
  })
  const { data: venues } = useQuery({
    queryKey: apiClient.venue.queryKeys.list.byConcertId(concert.id),
    queryFn: () => apiClient.venue.getVenuesByConcertId(concert.id),
  })
  const formattedDate = useMemo(() => {
    if (!concert.date) {
      return ''
    }
    return format(parseISO(concert.date), 'yyyy.MM.dd')
  }, [concert.date])
  const mainVenue = useMemo(() => {
    return venues?.at(0)
  }, [venues])
  return (
    <Link href={`/event/${concert.id}`}>
      <StyledRecentListBilletsConcertCard $isLoading={false}>
        <StyledRecentListBilletsConcertCardImage src={posters?.at(0)?.url} alt="concert" />
        <StyledTitle as="p">{concert.title}</StyledTitle>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
          <StyledRecentListParagraph as="p">{formattedDate}</StyledRecentListParagraph>
          <StyledRecentListParagraph as="p">{mainVenue?.name}</StyledRecentListParagraph>
        </div>
      </StyledRecentListBilletsConcertCard>
    </Link>
  )
}
