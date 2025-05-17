import { logEvent } from '@/features/firebase/firebase'
import { isEmptySource } from '@/libs/utils/utils.image'
import { components } from '@coldsurfers/api-sdk'
import { GlobalLink } from 'app/(ui)/global-link/global-link'
import { format } from 'date-fns'
import { memo, useCallback, useMemo } from 'react'
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
    if (isEmptySource(data.mainPoster?.url ?? '')) {
      return ''
    }
    return `${data.mainPoster!.url}`
  }, [data.mainPoster])

  const onClick = useCallback(() => {
    logEvent({
      name: 'click_event',
      params: { event_id: data.id },
    })
  }, [data.id])

  return (
    <GlobalLink href={`/event/${data.slug}`} onClick={onClick}>
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
