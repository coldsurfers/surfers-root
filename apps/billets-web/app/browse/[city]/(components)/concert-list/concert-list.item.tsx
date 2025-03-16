import { GlobalLink } from 'app/(ui)/global-link/global-link'
import { format } from 'date-fns'
import { memo, useMemo } from 'react'
import { components } from 'types/api'
import {
  StyledGridDate,
  StyledGridImage,
  StyledGridImageEmptyContainer,
  StyledGridImageEmptyText,
  StyledGridItem,
  StyledGridTextContainer,
  StyledGridTitle,
  StyledVenueText,
} from './concert-list.styled'

export const ConcertListItem = memo(({ data }: { data: components['schemas']['ConcertDTOSchema'] }) => {
  const formattedDate = useMemo(() => {
    if (!data.date) {
      return ''
    }
    return format(new Date(data.date), 'EEE, MMM dd')
  }, [data.date])
  const thumbUrl = useMemo(() => {
    if (!data.mainPoster || !data.mainPoster.url) {
      return ''
    }
    return `${data.mainPoster.url}&width=400&height=400`
  }, [data.mainPoster])
  return (
    <GlobalLink href={`/event/${data.slug}`}>
      <StyledGridItem>
        {thumbUrl ? (
          <StyledGridImage src={thumbUrl} alt={data.title} />
        ) : (
          <StyledGridImageEmptyContainer>
            <StyledGridImageEmptyText>{data.title}</StyledGridImageEmptyText>
          </StyledGridImageEmptyContainer>
        )}
        <StyledGridTextContainer>
          <StyledGridTitle as="p">{data.title}</StyledGridTitle>
          <StyledGridDate as="p">{formattedDate}</StyledGridDate>
          {data.mainVenue?.name && <StyledVenueText as="p">{data.mainVenue.name}</StyledVenueText>}
        </StyledGridTextContainer>
      </StyledGridItem>
    </GlobalLink>
  )
})
