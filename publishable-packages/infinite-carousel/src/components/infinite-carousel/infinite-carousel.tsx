import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type TouchEventHandler, useCallback, useRef } from 'react';
import { useInfiniteHomeCollection } from './infinite-carousel.hooks';
import { InfiniteHomeCollectionItem } from './infinite-carousel.item';
import {
  StyledInfiniteHomeCollectionScrollContainer,
  StyledInfiniteHomeCollectionScrollContainerArrow,
} from './infinite-carousel.styled';
import type { BreakpointT, DataT, ItemRenderT } from './infinite-carousel.types';

const DISABLE_PREV_BUTTON = false;

const Wrapper = styled.div`
  position: relative;
`;

type Props = {
  breakpoints: BreakpointT[];
  data: DataT[];
} & ItemRenderT;

export const InfiniteCarousel = ({
  breakpoints,
  data,
  renderItemWrapper,
  renderPoster,
  renderTitle,
  renderDateDescription,
  renderVenueName,
}: Props) => {
  const {
    perPageItemCount,
    itemWidthPercent,
    data: infiniteCarouselData,
    flushNextPage,
    flushPrevPage,
    initialRotatePercent,
  } = useInfiniteHomeCollection({ breakpoints, data });

  const touchStartRef = useRef<number>(0);

  const controls = useAnimation();

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

  const onTouchStart = useCallback<TouchEventHandler<HTMLDivElement>>((e) => {
    touchStartRef.current = e.nativeEvent.changedTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      const touchStart = touchStartRef.current ?? 0;
      const touchEnd = e.nativeEvent.changedTouches[0].clientX;

      const diff = Math.abs(touchStart - touchEnd);
      if (diff < 50) {
        return;
      }
      const isPrev = touchStart < touchEnd;
      if (isPrev) {
        runInfiniteAnimation('prev');
      } else {
        runInfiniteAnimation('next');
      }
    },
    [runInfiniteAnimation]
  );

  return (
    <Wrapper>
      <StyledInfiniteHomeCollectionScrollContainer
        animate={controls}
        initial={{
          transform: `translateX(${initialRotatePercent}%)`,
        }}
        key={initialRotatePercent}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {infiniteCarouselData.carouselItems.map((value, index) => {
          return (
            <InfiniteHomeCollectionItem
              {...value}
              renderPoster={renderPoster}
              renderTitle={renderTitle}
              renderDateDescription={renderDateDescription}
              renderVenueName={renderVenueName}
              key={`${value.title}-${index}`}
              renderItemWrapper={renderItemWrapper}
              breakpoints={breakpoints}
            />
          );
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
