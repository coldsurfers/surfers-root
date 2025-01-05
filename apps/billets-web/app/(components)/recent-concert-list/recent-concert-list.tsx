'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { ResolvedValues, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useLayoutEffect, useRef } from 'react'
import {
  StyledMotionDiv,
  StyledRecentListBilletsConcertCard,
  StyledRecentListBilletsConcertCardImage,
  StyledRecentListParagraph,
  StyledRecentListScrollContainer,
  StyledTitle,
} from './recent-concert-list.styled'

export const RecentConcertList = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await apiClient.concerts.getConcerts({
        offset: 0,
        size: 20,
      }),
    queryKey: apiClient.concerts.queryKeys.getConcerts({ offset: 0, size: 20 }),
  })
  const controls = useAnimation()
  const latestX = useRef<string>('0%')

  const startAnim = useCallback(() => {
    controls.start({
      x: [latestX.current, '-100%'], // Moves from start to end
    })
  }, [controls])

  const onUpdate = useCallback((latest: ResolvedValues) => {
    if (latest.x) {
      latestX.current = latest.x as string
    }
  }, [])

  useLayoutEffect(() => {
    startAnim()
  }, [startAnim])

  return (
    <StyledRecentListScrollContainer
      onMouseEnter={controls.stop}
      onMouseLeave={startAnim}
      onTouchStart={controls.stop}
      onTouchEnd={startAnim}
      onScroll={(e) => e.preventDefault()}
    >
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
          {Array.from({ length: 10 }, (_, index) => ({
            index,
            id: index,
          })).map((value) => (
            <StyledRecentListBilletsConcertCard key={value.id} $isLoading />
          ))}
        </div>
      ) : (
        <StyledMotionDiv
          initial={{ x: '0%' }}
          animate={controls}
          transition={{
            repeat: Infinity, // Loops indefinitely
            duration: 60, // Adjust speed (higher = slower)
            ease: 'linear', // Smooth constant scroll
          }}
          onUpdate={onUpdate}
        >
          {data?.map((value) => (
            <Link href={`/concert-detail/${value.id}`} key={value.id}>
              <StyledRecentListBilletsConcertCard $isLoading={false}>
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
        </StyledMotionDiv>
      )}
    </StyledRecentListScrollContainer>
  )
}
