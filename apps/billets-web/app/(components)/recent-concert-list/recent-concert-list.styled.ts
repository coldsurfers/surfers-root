import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const StyledRecentListScrollContainer = styled.div`
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

export const StyledTitle = styled(Text)`
  font-size: 15px;

  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 0;
  margin-bottom: 0;

  ${media.large(css`
    font-size: 13px;
  `)};
`

export const StyledRecentListParagraph = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 0;
  margin-bottom: 0;

  ${media.large(css`
    font-size: 12px;
  `)};
`

export const StyledRecentListBilletsConcertCard = styled.div<{ $isLoading: boolean }>`
  width: 200px;
  height: ${(props) => (props.$isLoading ? '180px' : '300px')};
  overflow: hidden;
  background: ${(props) =>
    props.$isLoading ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)' : 'none'};
  background-position: 50%;
  background-size: cover;
  animation: ${(props) => (props.$isLoading ? 'loading 1.5s infinite' : 'none')};

  border-radius: 8px;

  ${(props) => {
    const height = props.$isLoading ? '160px' : '260px'
    return media.large(css`
      width: 180px;
      height: ${height};
    `)
  }};

  ${(props) => {
    const height = props.$isLoading ? '140px' : '250px'
    return media.medium(css`
      width: 140px;
      height: ${height};
    `)
  }};

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`

export const StyledRecentListBilletsConcertCardImage = styled.img`
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-position: 50%;
`

export const StyledRecentListBilletsConcertCardImageEmpty = styled.div`
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-position: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${semantics.color.background[1]};
  margin-bottom: 0.25rem;
`

export const StyledRecentListBilletsConcertCardImageEmptyText = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 16px;

  padding-left: 1rem;
  padding-right: 1rem;
`

export const StyledMotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
`
