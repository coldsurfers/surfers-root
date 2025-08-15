'use client';

import { apiClient, initialPageQuery } from '@/libs/openapi-client';
import { GlobalLink } from '@/shared/ui';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAnimation } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { match } from 'ts-pattern';
import { INFINITE_HOME_COLLECTION_MIN_COUNT } from './infinite-home-collection.constants';
import { useInfiniteHomeCollection } from './infinite-home-collection.hooks';
import { InfiniteHomeCollectionItem } from './infinite-home-collection.item';
import {
  StyledInfiniteHomeCollectionItemTitle,
  StyledInfiniteHomeCollectionScrollContainer,
  StyledInfiniteHomeCollectionScrollContainerArrow,
  StyledInfiniteHomeCollectionTitle,
} from './infinite-home-collection.styled';

const Wrapper = styled.div`
  position: relative;
`;

type Props = {
  slug: string;
  col?: number;
};

type DataT = Awaited<ReturnType<typeof apiClient.venue.getVenueDetailBySlug>>;
type MutableDataT = {
  name: string;
  upcomingEvents: (DataT['upcomingEvents'][number] | { type: 'empty' })[];
};

export const InfiniteHomeCollection = ({ slug }: Props) => {
  const { data: serverData } = useSuspenseQuery<DataT, OpenApiError, MutableDataT>({
    queryKey: initialPageQuery.homeVenueCollection(slug).queryKey,
    queryFn: () => apiClient.venue.getVenueDetailBySlug(slug),
  });

  const dataToCopy = useMemo(() => {
    let data: (typeof serverData)['upcomingEvents'] = [];
    if (serverData.upcomingEvents.length > INFINITE_HOME_COLLECTION_MIN_COUNT) {
      data = serverData.upcomingEvents.slice(0, INFINITE_HOME_COLLECTION_MIN_COUNT);
    }
    if (data.length < INFINITE_HOME_COLLECTION_MIN_COUNT) {
      while (data.length < INFINITE_HOME_COLLECTION_MIN_COUNT) {
        data.push(...serverData.upcomingEvents);
      }
    }
    return data;
  }, [serverData.upcomingEvents]);

  const [infiniteData, setInfiniteData] =
    useState<(typeof serverData)['upcomingEvents']>(dataToCopy);

  const controls = useAnimation();

  const { perPageItemCount, itemWidthPercent } = useInfiniteHomeCollection();

  const runInfiniteAnimation = useCallback(() => {
    controls
      .start({
        transform: `translateX(${-(perPageItemCount * itemWidthPercent)}%)`,
        transition: {
          stiffness: 200,
          duration: 0.6,
        },
      })
      .then(() => {
        flushSync(() => {
          setInfiniteData((prev) => {
            const newData = [...prev];
            const pre = newData.slice(0, perPageItemCount);
            const middle = newData.slice(perPageItemCount, perPageItemCount * 2);
            const final = newData.slice(perPageItemCount * 2, perPageItemCount * 3);
            return [...middle, ...final, ...pre];
          });
        });
        controls.set({
          transform: `translateX(${0}%)`,
        });
      });
  }, [controls, itemWidthPercent, perPageItemCount]);

  return (
    <Wrapper>
      <GlobalLink href={`/venue/${slug}`}>
        <StyledInfiniteHomeCollectionTitle as="h2">
          {serverData.name}
          <ChevronRight style={{ marginLeft: '0.5rem' }} />
        </StyledInfiniteHomeCollectionTitle>
      </GlobalLink>
      <StyledInfiniteHomeCollectionScrollContainer animate={controls}>
        {infiniteData.map((value, index) => {
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
