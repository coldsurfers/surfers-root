import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  APP_CONTAINER_MAX_WIDTH,
  APP_CONTAINER_PADDING,
  APP_CONTAINER_PADDING_LARGE,
  SLICK_SLIDE_INTER_SPACE,
  SLICK_SLIDE_INTER_SPACE_LARGE,
} from 'app/(ui)/constants';
import { motion } from 'framer-motion';

export const StyledRecentListTitle = styled(Text)`
  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 125px;

  display: flex;
  align-items: center;

  ${media.medium(css`
    margin-top: 88px;
    font-size: 24px;
  `)}

  ${media.small(css`
    margin-top: 44px;
    font-size: 20px;
  `)}

  svg {
    display: none;
  }

  &:hover {
    svg {
      display: block;
    }
  }
`;

export const StyledRecentListScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: auto; // Enable horizontal scrolling
  scrollbar-width: none; // Hide scrollbar for Firefox
  -ms-overflow-style: none; // Hide scrollbar for Internet Explorer and Edge
  scroll-snap-type: x mandatory;

  @media (max-width: 960px) {
    margin-top: 22px;
  }
`;

export const StyledTitle = styled(Text)`
  font-size: 1.25rem;

  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 1rem;
  margin-bottom: 0;

  ${media['x-large'](css`
    font-size: 1rem;
  `)};

  ${media.medium(css`
    font-size: 0.9rem;
    margin-top: 0.5rem;
  `)};
`;

export const StyledRecentListParagraph = styled(Text)`
  font-size: 1.1rem;
  font-weight: 500;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 0;
  margin-bottom: 0;

  ${media['x-large'](css`
    font-size: 0.9rem;
  `)};

  ${media.medium(css`
    font-size: 0.8rem;
  `)};
`;

export const StyledRecentListBilletsConcertCard = styled.div<{ $isLoading: boolean }>`
  width: calc((${APP_CONTAINER_MAX_WIDTH}px - (${APP_CONTAINER_PADDING}px * 2)px - ${SLICK_SLIDE_INTER_SPACE}px * 3) / 4);
  overflow: hidden;
  background: ${(props) =>
    props.$isLoading ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)' : 'none'};
  background-position: 50%;
  background-size: cover;
  animation: ${(props) => (props.$isLoading ? 'loading 1.5s infinite' : 'none')};

  border-radius: 8px;

  ${media.large(css`
    width: calc((${APP_CONTAINER_MAX_WIDTH}px - (${APP_CONTAINER_PADDING_LARGE}px * 2)px - ${SLICK_SLIDE_INTER_SPACE_LARGE}px * 3) / 4);
  `)}

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

export const StyledRecentListBilletsConcertCardImage = styled.img`
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-position: 50%;
`;

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
`;

export const StyledRecentListBilletsConcertCardImageEmptyText = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 16px;

  padding-left: 1rem;
  padding-right: 1rem;
`;

export const StyledMotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
