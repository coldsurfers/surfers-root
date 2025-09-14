'use client';

import { logEvent } from '@/features/firebase/firebase';
import { apiClient, initialPageQuery } from '@/libs/openapi-client';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { GlobalLink, VenueTitleMotion } from '@/shared/ui';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { InfiniteCarousel } from '@coldsurfers/infinite-carousel';
import { breakpoints } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import {
  INFINITE_HOME_COLLECTION_ITEM_WIDTH_PERCENT,
  INFINITE_HOME_COLLECTION_PER_PAGE_ITEM_COUNT,
} from './infinite-home-collection.constants';
import { StyledInfiniteHomeCollectionTitle } from './infinite-home-collection.styled';

const Wrapper = styled.div`
  position: relative;
`;

type DataT = Awaited<ReturnType<typeof apiClient.venue.getVenueDetailBySlug>>;
type MutableDataT = {
  name: string;
  upcomingEvents: (DataT['upcomingEvents'][number] | { type: 'empty' })[];
};

type Props = {
  slug: string;
};

export const InfiniteHomeCollection = ({ slug }: Props) => {
  const { data: serverData } = useSuspenseQuery<DataT, OpenApiError, MutableDataT>({
    queryKey: initialPageQuery.homeVenueCollection(slug).queryKey,
    queryFn: () => apiClient.venue.getVenueDetailBySlug(slug),
  });

  const collectionTitle = useMemo(() => {
    return serverData.name;
  }, [serverData.name]);

  const carouselData = useMemo(() => {
    const filtered = serverData.upcomingEvents.filter((item) => item.type === 'concert');
    return filtered;
  }, [serverData.upcomingEvents]);

  // @TODO: fix in infinite carousel
  if (carouselData.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <GlobalLink href={`/venue/${slug}`}>
        <VenueTitleMotion
          text={
            <StyledInfiniteHomeCollectionTitle as="h2">
              {collectionTitle}
              <ChevronRight style={{ marginLeft: '0.5rem' }} />
            </StyledInfiniteHomeCollectionTitle>
          }
        />
      </GlobalLink>
      <InfiniteCarousel
        renderItemWrapper={(children, item) => {
          const targetItem = carouselData.find(
            (carouselItem) => carouselItem.data.title === item.title
          );
          return (
            <GlobalLink
              href={targetItem ? generateSlugHref(targetItem.data.slug) : ''}
              onClick={() => {
                if (targetItem) {
                  logEvent({
                    name: 'click_home_collection',
                    params: {
                      event_id: targetItem.data.id,
                    },
                  });
                }
              }}
            >
              {children}
            </GlobalLink>
          );
        }}
        breakpoints={[
          {
            windowWidthLargerThan: breakpoints['x-large'],
            itemWidthPercent: INFINITE_HOME_COLLECTION_ITEM_WIDTH_PERCENT.DEFAULT,
            perPageItemCount: INFINITE_HOME_COLLECTION_PER_PAGE_ITEM_COUNT.DEFAULT,
          },
          {
            windowWidthLargerThan: breakpoints.large,
            itemWidthPercent: INFINITE_HOME_COLLECTION_ITEM_WIDTH_PERCENT.X_LARGE,
            perPageItemCount: INFINITE_HOME_COLLECTION_PER_PAGE_ITEM_COUNT.X_LARGE,
          },
          {
            windowWidthLargerThan: breakpoints.medium,
            itemWidthPercent: INFINITE_HOME_COLLECTION_ITEM_WIDTH_PERCENT.LARGE,
            perPageItemCount: INFINITE_HOME_COLLECTION_PER_PAGE_ITEM_COUNT.LARGE,
          },
        ]}
        data={carouselData.map((item) => {
          return {
            dateDescription: format(parseISO(item.data.date), 'yyyy.MM.dd'),
            posterSrc: item.data.mainPoster?.url ?? '',
            title: item.data.title ?? '',
            venueName: item.data.mainVenue?.name ?? '',
          };
        })}
      />
    </Wrapper>
  );
};
