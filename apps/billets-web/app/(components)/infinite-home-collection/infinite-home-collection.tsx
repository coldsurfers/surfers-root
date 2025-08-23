'use client';

import { GlobalLink } from '@/shared/ui';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { match } from 'ts-pattern';
import { useInfiniteHomeCollection } from './infinite-home-collection.hooks';
import { InfiniteHomeCollectionItem } from './infinite-home-collection.item';
import {
  StyledInfiniteHomeCollectionScrollContainer,
  StyledInfiniteHomeCollectionScrollContainerArrow,
  StyledInfiniteHomeCollectionTitle,
} from './infinite-home-collection.styled';

const DISABLE_PREV_BUTTON = false;

const Wrapper = styled.div`
  position: relative;
`;

type Props = {
  slug: string;
};

export const InfiniteHomeCollection = ({ slug }: Props) => {
  const { perPageItemCount, itemWidthPercent, data, flushNextPage, flushPrevPage } =
    useInfiniteHomeCollection(slug);

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
      <GlobalLink href={`/venue/${slug}`}>
        <StyledInfiniteHomeCollectionTitle as="h2">
          {data.collectionTitle}
          <ChevronRight style={{ marginLeft: '0.5rem' }} />
        </StyledInfiniteHomeCollectionTitle>
      </GlobalLink>
      <StyledInfiniteHomeCollectionScrollContainer
        animate={controls}
        initial={{
          transform: `translateX(${initialRotatePercent}%)`,
        }}
      >
        {data.collectionItems.map((value, index) => {
          return match(value)
            .with({ type: 'concert' }, (value) => {
              return (
                <InfiniteHomeCollectionItem data={value.data} key={`${value.data.id}-${index}`} />
              );
            })
            .otherwise(() => null);
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
