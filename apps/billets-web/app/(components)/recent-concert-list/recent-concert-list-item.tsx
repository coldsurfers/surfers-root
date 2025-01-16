'use client'

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

export const RecentConcertListItem = ({ data }: { data: components['schemas']['ConcertDTOSchema'] }) => {
  const formattedDate = useMemo(() => {
    if (!data.date) {
      return ''
    }
    return format(parseISO(data.date), 'yyyy.MM.dd')
  }, [data.date])
  const thumbUrl = useMemo(() => {
    if (!data.mainPoster) {
      return ''
    }
    return `${data.mainPoster.url}&width=250&height=250`
  }, [data.mainPoster])
  return (
    <Link href={`/event/${data.id}`}>
      <StyledRecentListBilletsConcertCard $isLoading={false}>
        <StyledRecentListBilletsConcertCardImage src={thumbUrl} alt="concert" />
        <StyledTitle as="p">{data.title}</StyledTitle>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
          <StyledRecentListParagraph as="p">{formattedDate}</StyledRecentListParagraph>
          <StyledRecentListParagraph as="p">{data.mainVenue?.name}</StyledRecentListParagraph>
        </div>
      </StyledRecentListBilletsConcertCard>
    </Link>
  )
}
