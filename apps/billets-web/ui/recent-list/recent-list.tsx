'use client'

import { useGetBilletsConcertQuery } from '@/features/billets'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { useEffect, useRef, WheelEventHandler } from 'react'
import {
  StyledRecentListBilletsConcertCard,
  StyledRecentListParagraph,
  StyledRecentListScrollContainer,
} from './recent-list.styled'

export const RecentList = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { data, isLoading } = useGetBilletsConcertQuery()
  const handleWheelScroll: WheelEventHandler<HTMLDivElement> = (event) => {
    const scrollAmount = event.deltaY
    const container = event.currentTarget as HTMLElement
    container.scrollBy({
      left: scrollAmount,
      behavior: 'instant',
    })
  }

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node | null)) {
        return
      }
      const container = containerRef.current
      const startX = e.clientX
      const { scrollLeft } = container

      const onMouseMove = (moveEvent: MouseEvent) => {
        const x = moveEvent.clientX - startX
        container.scrollLeft = scrollLeft - x
      }

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousedown', onMouseDown)

    const cleanup = () => {
      window.removeEventListener('mousedown', onMouseDown)
    }
    return cleanup
  }, [])

  return (
    <StyledRecentListScrollContainer ref={containerRef} onWheel={handleWheelScroll}>
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
