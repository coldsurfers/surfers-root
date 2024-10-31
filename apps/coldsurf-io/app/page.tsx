'use client'

import { Button } from '@coldsurfers/hotsurf'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { WheelEventHandler } from 'react'
import styled from 'styled-components'
import { BILLETS_APP_URL } from '../features/billets/billets.constants'
import { useGetBilletsConcertQuery } from '../features/billets/billets.hooks'

const MainTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
  white-space: pre-line; /* This allows newline support */

  @media (max-width: 960px) {
    font-size: 32px;
    white-space: normal;
  }
`

const StyledParagraph = styled.p`
  font-size: 14px;
  font-weight: 500;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 0;
  margin-bottom: 0;
`

const BilletsConcertCard = styled.div<{ $isLoading: boolean }>`
  width: 180px;
  height: ${(props) => (props.$isLoading ? '180px' : '260px')};
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) =>
    props.$isLoading ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)' : 'none'};
  background-size: 200% 100%;
  animation: ${(props) => (props.$isLoading ? 'loading 1.5s infinite' : 'none')};

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 125px;
  overflow-x: auto; // Enable horizontal scrolling
  scrollbar-width: none; // Hide scrollbar for Firefox
  -ms-overflow-style: none; // Hide scrollbar for Internet Explorer and Edge
  padding: 16px;
  scroll-snap-type: x mandatory;

  @media (max-width: 960px) {
    margin-top: 22px;
  }
`

const Wrapper = styled.div`
  flex: 1;
`

const Top = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding: 16px;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }
`

const TopImage = styled(Image)`
  border-radius: 8px;

  @media (max-width: 960px) {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`

export default function Home() {
  const { data, isLoading } = useGetBilletsConcertQuery()
  const handleWheelScroll: WheelEventHandler<HTMLDivElement> = (event) => {
    // event.preventDefault()
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
    <Wrapper>
      <Top>
        <div
          style={{
            flex: 1,
          }}
        >
          <MainTitle>Billets</MainTitle>
          <MainTitle>{'예정된\n많은 공연을\n놓치지 마세요 🎉'}</MainTitle>
          <Link href={BILLETS_APP_URL} style={{ display: 'inline-block' }}>
            <Button text="Get Billets app" color="pink" />
          </Link>
        </div>
        <div style={{ flex: 1, borderRadius: 8 }}>
          <TopImage
            src="https://coldsurf-aws-s3-bucket.s3.ap-northeast-2.amazonaws.com/billets/static/coldsurf-io/static-images/live-party.webp"
            alt="live-party"
            width={500}
            height={500}
          />
        </div>
      </Top>
      <ScrollContainer onWheel={handleWheelScroll} onMouseDown={handleDragScroll}>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            {Array.from({ length: 10 }, (_, index) => ({
              index,
              id: index,
            })).map((value) => (
              <BilletsConcertCard key={value.id} $isLoading={isLoading} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            {data?.data?.map((value) => (
              <BilletsConcertCard key={value.id} $isLoading={isLoading}>
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
                <StyledParagraph>{value.title}</StyledParagraph>
                <StyledParagraph>{format(parseISO(value.date), 'yyyy.MM.dd')}</StyledParagraph>
                <StyledParagraph>{value.venues[0].venueTitle}</StyledParagraph>
              </BilletsConcertCard>
            ))}
          </div>
        )}
      </ScrollContainer>
    </Wrapper>
  )
}
