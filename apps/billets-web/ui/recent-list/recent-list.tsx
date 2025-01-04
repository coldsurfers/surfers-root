'use client'

import { useGetBilletsConcertQuery } from '@/features/billets'
import { format, parseISO } from 'date-fns'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, WheelEventHandler } from 'react'
import {
  StyledRecentListBilletsConcertCard,
  StyledRecentListBilletsConcertCardImage,
  StyledRecentListParagraph,
  StyledRecentListScrollContainer,
  StyledTitle,
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
        <motion.div
          animate={{
            x: ['0%', '-100%'], // Moves from start to end
          }}
          transition={{
            repeat: Infinity, // Loops indefinitely
            duration: 60, // Adjust speed (higher = slower)
            ease: 'linear', // Smooth constant scroll
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
          }}
        >
          {data?.data?.map((value) => (
            <Link href={`/concert-detail/${value.id}`} key={value.id}>
              <StyledRecentListBilletsConcertCard $isLoading={isLoading}>
                <StyledRecentListBilletsConcertCardImage src={value.posters[0].imageUrl} alt="concert" />
                <StyledTitle as="p">{value.title}</StyledTitle>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
                  <StyledRecentListParagraph as="p">
                    {format(parseISO(value.date), 'yyyy.MM.dd')}
                  </StyledRecentListParagraph>
                  <StyledRecentListParagraph as="p">{value.venues[0].venueTitle}</StyledRecentListParagraph>
                </div>
              </StyledRecentListBilletsConcertCard>
            </Link>
          ))}
        </motion.div>
      )}
    </StyledRecentListScrollContainer>
  )
}
