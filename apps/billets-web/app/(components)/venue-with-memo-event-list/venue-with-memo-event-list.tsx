'use client';

import { apiClient, initialPageQuery } from '@/libs/openapi-client';
import { useWindowWidth } from '@/shared/lib/use-window-width';
import { GlobalLink } from '@/shared/ui';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { breakpoints, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAnimation } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { match } from 'ts-pattern';
import { RecentConcertListItem } from '../recent-concert-list/recent-concert-list-item';
import {
  StyledRecentListScrollContainer,
  StyledRecentListScrollContainerArrow,
  StyledRecentListTitle,
} from '../recent-concert-list/recent-concert-list.styled';

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

export const VenueWithMemoEventList = ({ slug }: Props) => {
  const { data: serverData } = useSuspenseQuery<DataT, OpenApiError, MutableDataT>({
    queryKey: initialPageQuery.homeVenueCollection(slug).queryKey,
    queryFn: async () => {
      return await apiClient.venue.getVenueDetailBySlug(slug);
    },
  });

  const dataToCopy = useMemo(() => {
    const minLength = 18;
    let data: (typeof serverData)['upcomingEvents'] = [];
    if (serverData.upcomingEvents.length > minLength) {
      data = serverData.upcomingEvents.slice(0, minLength);
    }
    if (data.length < minLength) {
      while (data.length < minLength) {
        data.push(...serverData.upcomingEvents);
      }
    }
    return data;
  }, [serverData.upcomingEvents]);

  const [infiniteData, setInfiniteData] =
    useState<(typeof serverData)['upcomingEvents']>(dataToCopy);

  const controls = useAnimation();

  const windowWidth = useWindowWidth();

  const handleClick = () => {
    const perPageItemCount = 6;
    const itemWidthPercent = match(windowWidth)
      .when(
        (width) => width > breakpoints['x-large'],
        () => 16
      )
      .when(
        (width) => width > breakpoints.large,
        () => 24
      )
      .when(
        (width) => width > breakpoints.medium,
        () => 32
      )
      .otherwise(() => 32);

    controls
      .start({
        transform: `translateX(${-(perPageItemCount * itemWidthPercent)}%)`,
        transition: {
          stiffness: 200,
          duration: 1.0,
        },
      })
      .then(() => {
        requestAnimationFrame(() => {
          setInfiniteData((prev) => {
            const newData = [...prev];
            const pre = newData.slice(0, perPageItemCount);
            const middle = newData.slice(perPageItemCount, perPageItemCount * 2);
            const final = newData.slice(perPageItemCount * 2, perPageItemCount * 3);
            return [...middle, ...final, ...pre];
          });
          controls.set({
            transform: `translateX(${0}%)`,
          });
        });
      });
  };

  return (
    <Wrapper>
      <GlobalLink href={`/venue/${slug}`}>
        <StyledRecentListTitle as="h2">
          {serverData.name}
          <ChevronRight style={{ marginLeft: '0.5rem' }} />
        </StyledRecentListTitle>
      </GlobalLink>
      <StyledRecentListScrollContainer animate={controls}>
        {infiniteData.map((value, index) => {
          return match(value)
            .with({ type: 'concert' }, (value) => {
              return <RecentConcertListItem data={value.data} key={`${value.data.id}-${index}`} />;
            })
            .otherwise(() => null);
        })}
      </StyledRecentListScrollContainer>
      <StyledRecentListScrollContainerArrow onClick={handleClick}>
        <ChevronRight color={semantics.color.foreground[1]} size={48} />
      </StyledRecentListScrollContainerArrow>
    </Wrapper>
  );
};
