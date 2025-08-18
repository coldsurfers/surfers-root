'use client';

import { GlobalLink } from '@/shared/ui';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useAnimation } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { match } from 'ts-pattern';
import { useInfiniteHomeCollection } from './infinite-home-collection.hooks';
import { InfiniteHomeCollectionItem } from './infinite-home-collection.item';
import {
  StyledInfiniteHomeCollectionScrollContainer,
  StyledInfiniteHomeCollectionScrollContainerArrow,
  StyledInfiniteHomeCollectionTitle,
} from './infinite-home-collection.styled';

const LEFT_SPACE_PERCENT = 10;

const Wrapper = styled.div`
  position: relative;
`;

type Props = {
  slug: string;
};

export const InfiniteHomeCollection = ({ slug }: Props) => {
  const { perPageItemCount, itemWidthPercent, data, flushNextPage } =
    useInfiniteHomeCollection(slug);

  const controls = useAnimation();

  const runInfiniteAnimation = useCallback(() => {
    controls
      .start({
        transform: `translateX(${-(perPageItemCount * itemWidthPercent + LEFT_SPACE_PERCENT)}%)`,
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
          transform: `translateX(${-LEFT_SPACE_PERCENT}%)`,
        });
      });
  }, [controls, flushNextPage, itemWidthPercent, perPageItemCount]);

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
        initial={{ transform: `translateX(${-LEFT_SPACE_PERCENT}%)` }}
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
      <StyledInfiniteHomeCollectionScrollContainerArrow $isLeft onClick={runInfiniteAnimation}>
        <ChevronRight color={semantics.color.background[1]} size={48} />
      </StyledInfiniteHomeCollectionScrollContainerArrow>
      <StyledInfiniteHomeCollectionScrollContainerArrow
        $isLeft={false}
        onClick={runInfiniteAnimation}
      >
        <ChevronRight color={semantics.color.background[1]} size={48} />
      </StyledInfiniteHomeCollectionScrollContainerArrow>
    </Wrapper>
  );
};
