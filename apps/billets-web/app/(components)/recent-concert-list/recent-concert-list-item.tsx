'use client';

import { isEmptySource } from '@/libs/utils/utils.image';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { GlobalLink } from '@/shared/ui';
import type { components } from '@coldsurfers/api-sdk';
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';
import {
  StyledRecentListBilletsConcertCard,
  StyledRecentListBilletsConcertCardImage,
  StyledRecentListBilletsConcertCardImageEmpty,
  StyledRecentListBilletsConcertCardImageEmptyText,
  StyledRecentListParagraph,
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
  return (
    <GlobalLink href={href}>
      <StyledRecentListBilletsConcertCard $isLoading={false}>
        {thumbUrl ? (
          <StyledRecentListBilletsConcertCardImage src={thumbUrl} alt={data.title} />
        ) : (
          <StyledRecentListBilletsConcertCardImageEmpty>
            <StyledRecentListBilletsConcertCardImageEmptyText>
              {data.title}
            </StyledRecentListBilletsConcertCardImageEmptyText>
          </StyledRecentListBilletsConcertCardImageEmpty>
        )}
        <StyledTitle as="p">{data.title}</StyledTitle>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
          <StyledRecentListParagraph as="p">{formattedDate}</StyledRecentListParagraph>
          <StyledRecentListParagraph as="p">{data.mainVenue?.name}</StyledRecentListParagraph>
        </div>
      </StyledRecentListBilletsConcertCard>
    </GlobalLink>
  );
};
