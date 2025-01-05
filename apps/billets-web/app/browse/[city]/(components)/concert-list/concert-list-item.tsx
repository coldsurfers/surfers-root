import { format } from 'date-fns'
import Link from 'next/link'
import { memo } from 'react'
import {
  StyledGridDate,
  StyledGridImage,
  StyledGridItem,
  StyledGridTextContainer,
  StyledGridTitle,
  StyledVenueText,
} from './concert-list.styled'

export const ConcertListItem = memo(
  ({
    id,
    posterUrl,
    title,
    date,
    venueTitle,
  }: {
    id: string
    posterUrl?: string
    title: string
    date: string
    venueTitle?: string
  }) => {
    return (
      <Link href={`/concert-detail/${id}`}>
        <StyledGridItem>
          <StyledGridImage src={posterUrl} alt={title} />
          <StyledGridTextContainer>
            <StyledGridTitle as="p">{title}</StyledGridTitle>
            <StyledGridDate as="p">{format(new Date(date), 'EEE, MMM dd')}</StyledGridDate>
            {venueTitle && <StyledVenueText as="p">{venueTitle}</StyledVenueText>}
          </StyledGridTextContainer>
        </StyledGridItem>
      </Link>
    )
  },
)
