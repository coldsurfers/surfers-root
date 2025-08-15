'use client';

import { logEvent } from '@/features/firebase/firebase';
import { isEmptySource } from '@/libs/utils/utils.image';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { GlobalLink } from '@/shared/ui';
import type { components } from '@coldsurfers/api-sdk';
import { format, parseISO } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { InfiniteHomeCollectionItemThumbnail } from './infinite-home-collection.item-thumbnail';
import {
  StyledInfiniteHomeCollectionItem,
  StyledInfiniteHomeCollectionItemDescriptionText,
  StyledInfiniteHomeCollectionItemThumbnailWrapper,
  StyledInfiniteHomeCollectionItemTitle,
  StyledRecentListScrollContainerItem,
} from './infinite-home-collection.styled';

export const InfiniteHomeCollectionItem = ({
  data,
}: { data: components['schemas']['ConcertDTOSchema'] }) => {
  const formattedDate = useMemo(() => {
    if (!data.date) {
      return '';
    }
    return format(parseISO(data.date), 'yyyy.MM.dd');
  }, [data.date]);
  const thumbUrl = useMemo(() => {
    if (isEmptySource(data.mainPoster?.url ?? '')) {
      return '';
    }
    return `${data.mainPoster?.url}`;
  }, [data.mainPoster]);
  const href = generateSlugHref(data.slug);

  const logHomeCollectionEvent = useCallback(() => {
    logEvent({
      name: 'click_home_collection',
      params: {
        event_id: data.id,
      },
    });
  }, [data.id]);

  return (
    <StyledRecentListScrollContainerItem>
      <GlobalLink href={href} onClick={logHomeCollectionEvent}>
        <StyledInfiniteHomeCollectionItem $isLoading={false}>
          <StyledInfiniteHomeCollectionItemThumbnailWrapper>
            <InfiniteHomeCollectionItemThumbnail
              src={thumbUrl}
              alt={data.title}
              fallbackText={data.title}
            />
          </StyledInfiniteHomeCollectionItemThumbnailWrapper>
          <div style={{ position: 'absolute' }}>
            <StyledInfiniteHomeCollectionItemTitle as="p">
              {data.title}
            </StyledInfiniteHomeCollectionItemTitle>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
              <StyledInfiniteHomeCollectionItemDescriptionText as="p">
                {formattedDate}
              </StyledInfiniteHomeCollectionItemDescriptionText>
              <StyledInfiniteHomeCollectionItemDescriptionText as="p">
                {data.mainVenue?.name}
              </StyledInfiniteHomeCollectionItemDescriptionText>
            </div>
          </div>
        </StyledInfiniteHomeCollectionItem>
      </GlobalLink>
    </StyledRecentListScrollContainerItem>
  );
};
