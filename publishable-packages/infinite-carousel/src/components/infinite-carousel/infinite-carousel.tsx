import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { useInfiniteHomeCollection } from './infinite-carousel.hooks';
import { InfiniteHomeCollectionItem } from './infinite-carousel.item';
import {
  StyledInfiniteHomeCollectionScrollContainer,
  StyledInfiniteHomeCollectionScrollContainerArrow,
} from './infinite-carousel.styled';
import type { BreakpointT, DataT } from './infinite-carousel.types';

const DISABLE_PREV_BUTTON = false;

const Wrapper = styled.div`
  position: relative;
`;

type Props = {
  breakpoints: BreakpointT[];
  data: DataT[];
  titleLinkHref?: string;
};

export const InfiniteCarousel = ({ breakpoints, data }: Props) => {
  const {
    perPageItemCount,
    itemWidthPercent,
    data: infiniteCarouselData,
    flushNextPage,
    flushPrevPage,
  } = useInfiniteHomeCollection({ breakpoints, data });

  const controls = useAnimation();

  const initialRotatePercent = -(perPageItemCount * itemWidthPercent) + 2;

  const runInfiniteAnimation = useCallback(
    (type: 'prev' | 'next') => {
      const rotatePercent = perPageItemCount * itemWidthPercent;
      if (type === 'next') {
        controls
          .start({
            transform: `translateX(${initialRotatePercent - rotatePercent}%)`,
            transition: {
              stiffness: 100,
              duration: 0.8,
              type: 'keyframes',
              ease: 'easeInOut',
            },
          })
          .then(() => {
            flushNextPage();
            controls.set({
              transform: `translateX(${initialRotatePercent}%)`,
            });
          });
      }
      if (type === 'prev') {
        controls
          .start({
            transform: `translateX(${initialRotatePercent + rotatePercent}%)`,
            transition: {
              stiffness: 100,
              duration: 0.8,
              type: 'keyframes',
              ease: 'easeInOut',
            },
          })
          .then(() => {
            flushPrevPage();
            controls.set({
              transform: `translateX(${initialRotatePercent}%)`,
            });
          });
      }
    },
    [
      controls,
      flushNextPage,
      flushPrevPage,
      itemWidthPercent,
      perPageItemCount,
      initialRotatePercent,
    ]
  );

  return (
    <Wrapper>
      <StyledInfiniteHomeCollectionScrollContainer
        animate={controls}
        initial={{
          transform: `translateX(${initialRotatePercent}%)`,
        }}
      >
        {infiniteCarouselData.carouselItems.map((value, index) => {
          return <InfiniteHomeCollectionItem {...value} key={`${value.title}-${index}`} />;
        })}
      </StyledInfiniteHomeCollectionScrollContainer>
      {!DISABLE_PREV_BUTTON && (
        <StyledInfiniteHomeCollectionScrollContainerArrow
          $isLeft
          onClick={() => runInfiniteAnimation('prev')}
        >
          <ChevronLeft color={semantics.color.background[1]} size={48} />
        </StyledInfiniteHomeCollectionScrollContainerArrow>
      )}
      <StyledInfiniteHomeCollectionScrollContainerArrow
        $isLeft={false}
        onClick={() => runInfiniteAnimation('next')}
      >
        <ChevronRight color={semantics.color.background[1]} size={48} />
      </StyledInfiniteHomeCollectionScrollContainerArrow>
    </Wrapper>
  );
};
