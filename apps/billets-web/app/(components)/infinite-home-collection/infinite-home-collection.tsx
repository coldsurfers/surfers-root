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
        transform: `translateX(${-(perPageItemCount * itemWidthPercent)}%)`,
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
          transform: `translateX(${0}%)`,
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
      <StyledInfiniteHomeCollectionScrollContainer animate={controls}>
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
      <StyledInfiniteHomeCollectionScrollContainerArrow onClick={runInfiniteAnimation}>
        <ChevronRight color={semantics.color.foreground[1]} size={48} />
      </StyledInfiniteHomeCollectionScrollContainerArrow>
    </Wrapper>
  );
};
