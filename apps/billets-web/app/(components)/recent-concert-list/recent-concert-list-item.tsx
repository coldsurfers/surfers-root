'use client';

import { logEvent } from '@/features/firebase/firebase';
import { isEmptySource } from '@/libs/utils/utils.image';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { GlobalLink } from '@/shared/ui';
import type { components } from '@coldsurfers/api-sdk';
import { format, parseISO } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { RecentConcertListItemThumbnail } from './recent-concert-list-item-thumbnail';
import {
  StyledRecentListBilletsConcertCard,
  StyledRecentListBilletsConcertCardImageWrapper,
  StyledRecentListParagraph,
  StyledRecentListScrollContainerItem,
  StyledTitle,
} from './recent-concert-list.styled';

export const RecentConcertListItem = ({
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
        <StyledRecentListBilletsConcertCard $isLoading={false}>
          <StyledRecentListBilletsConcertCardImageWrapper>
            <RecentConcertListItemThumbnail
              src={thumbUrl}
              alt={data.title}
              fallbackText={data.title}
            />
          </StyledRecentListBilletsConcertCardImageWrapper>
          <div style={{ position: 'absolute' }}>
            <StyledTitle as="p">{data.title}</StyledTitle>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
              <StyledRecentListParagraph as="p">{formattedDate}</StyledRecentListParagraph>
              <StyledRecentListParagraph as="p">{data.mainVenue?.name}</StyledRecentListParagraph>
            </div>
          </div>
        </StyledRecentListBilletsConcertCard>
      </GlobalLink>
    </StyledRecentListScrollContainerItem>
  );
};

RecentConcertListItem.Empty = () => {
  return <div />;
};
