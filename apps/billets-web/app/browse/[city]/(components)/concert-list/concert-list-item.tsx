import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import Link from 'next/link'
import { memo, useMemo } from 'react'
import { components } from 'types/api'
import {
  StyledGridDate,
  StyledGridImage,
  StyledGridItem,
  StyledGridTextContainer,
  StyledGridTitle,
  StyledVenueText,
} from './concert-list.styled'

export const ConcertListItem = memo(({ concert }: { concert: components['schemas']['ConcertDTOSchema'] }) => {
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
    return format(new Date(concert.date), 'EEE, MMM dd')
  }, [concert.date])
  const mainVenue = useMemo(() => {
    return venues?.at(0)
  }, [venues])
  return (
    <Link href={`/event/${concert.id}`}>
      <StyledGridItem>
        <StyledGridImage src={posters?.at(0)?.url} alt={concert.title} />
        <StyledGridTextContainer>
          <StyledGridTitle as="p">{concert.title}</StyledGridTitle>
          <StyledGridDate as="p">{formattedDate}</StyledGridDate>
          {mainVenue && <StyledVenueText as="p">{mainVenue.name}</StyledVenueText>}
        </StyledGridTextContainer>
      </StyledGridItem>
    </Link>
  )
})
