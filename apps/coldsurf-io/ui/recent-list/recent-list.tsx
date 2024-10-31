'use client'

import { useGetBilletsConcertQuery } from '@/features/billets'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { WheelEventHandler } from 'react'
import {
  StyledRecentListBilletsConcertCard,
  StyledRecentListParagraph,
  StyledRecentListScrollContainer,
} from './recent-list.styled'

export const RecentList = () => {
  const { data, isLoading } = useGetBilletsConcertQuery()
  const handleWheelScroll: WheelEventHandler<HTMLDivElement> = (event) => {
    const scrollAmount = event.deltaY
    const container = event.currentTarget as HTMLElement
    container.scrollBy({
      left: scrollAmount,
      behavior: 'instant',
    })
  }

  const handleDragScroll = (event: React.MouseEvent) => {
    const container = event.currentTarget as HTMLElement
    const startX = event.clientX
    const { scrollLeft } = container

    const onMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.clientX - startX
      container.scrollLeft = scrollLeft - x
    }

    const onMouseUp = () => {
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseup', onMouseUp)
    }

    const onMouseLeave = () => {
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseup', onMouseUp)
    }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mouseleave', onMouseLeave)
  }

  return (
    <StyledRecentListScrollContainer onWheel={handleWheelScroll} onMouseDown={handleDragScroll}>
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
          {Array.from({ length: 10 }, (_, index) => ({
            index,
            id: index,
          })).map((value) => (
            <StyledRecentListBilletsConcertCard key={value.id} $isLoading={isLoading} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
          {data?.data?.map((value) => (
            <StyledRecentListBilletsConcertCard key={value.id} $isLoading={isLoading}>
              <Image
                src={value.posters[0].imageUrl}
                alt="concert"
                width={180}
                height={180}
                style={{
                  borderRadius: 8,
                  objectFit: 'cover',
                }}
                onMouseDown={(e) => e.preventDefault()}
              />
              <StyledRecentListParagraph>{value.title}</StyledRecentListParagraph>
              <StyledRecentListParagraph>{format(parseISO(value.date), 'yyyy.MM.dd')}</StyledRecentListParagraph>
              <StyledRecentListParagraph>{value.venues[0].venueTitle}</StyledRecentListParagraph>
            </StyledRecentListBilletsConcertCard>
          ))}
        </div>
      )}
    </StyledRecentListScrollContainer>
  )
}
