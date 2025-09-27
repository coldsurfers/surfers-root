import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { BreakpointT } from './infinite-carousel.types';

export const StyledInfiniteHomeCollectionScrollContainer = styled(motion.div)`
  position: relative;
  display: block;
  white-space: nowrap;
  overflow-x: visible;

  position: relative;
`;

export const StyledInfiniteHomeCollectionItem = styled.div<{ $isLoading: boolean }>`
  position: relative;
  background: ${(props) =>
    props.$isLoading ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)' : 'none'};
`;

export const StyledInfiniteHomeCollectionItemThumbnailWrapper = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${semantics.color.background[1]};
  border-radius: 8px;
  position: relative;
`;

export const StyledInfiniteHomeCollectionItemThumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  object-position: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const StyledInfiniteHomeCollectionItemThumbnailEmpty = styled.div`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  object-position: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
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

export const StyledInfiniteHomeCollectionScrollContainerArrow = styled.span<{ $isLeft: boolean }>`
  position: absolute;
  top: 0px;
  ${(props) => (props.$isLeft ? 'left: -0.4%;' : 'right: 0;')};
  bottom: 0px;
  width: 2%;
  background: rgba(0, 0, 0, 0.5);
  ${(props) => (props.$isLeft ? 'border-top-right-radius: 8px;' : 'border-top-left-radius: 8px;')};
  ${(props) => (props.$isLeft ? 'border-bottom-right-radius: 8px;' : 'border-bottom-left-radius: 8px;')};
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  ${media['x-large'](css`
    width: 5%;
  `)}

  ${media.small(css`
    display: none;
  `)}

  &:hover {
    svg {
      scale: 1.25;
    }
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const StyledRecentListScrollContainerItem = styled.div<{ $breakpoints: BreakpointT[] }>`
  aspect-ratio: 1 / 1;
  padding-right: .4vw;
  padding-bottom: 88px;

  display: inline-block;

  /* 1) 기본(모바일) 스타일: 가장 작은 규칙 or 명시적 기본값 */
  ${({ $breakpoints }) => {
    const sorted = $breakpoints.sort((a, b) => b.windowWidthLargerThan - a.windowWidthLargerThan);
    const base = sorted.at(-1)?.itemWidthPercent ?? 0;
    return css`
      width: ${base}%;
    `;
  }}

  ${({ $breakpoints }) =>
    $breakpoints
      .sort((a, b) => a.windowWidthLargerThan - b.windowWidthLargerThan)
      .map(
        (bp) => css`
                  @media screen and (min-width: ${bp.windowWidthLargerThan}px) {
                    width: ${bp.itemWidthPercent}%;
                  }
                `
      )}
`;

export const StyledInfiniteHomeCollectionItemBottomWrapper = styled.div`
  position: absolute;
`;
