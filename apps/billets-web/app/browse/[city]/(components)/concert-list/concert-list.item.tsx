import { logEvent } from '@/features/firebase/firebase';
import { FixedSubscribeEventButtonLayout, SubscribeEventButton } from '@/features/subscribe';
import { isEmptySource } from '@/libs/utils/utils.image';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { featureFlags } from '@/shared/constants';
import { GlobalLink } from '@/shared/ui';
import type { components } from '@coldsurfers/api-sdk';
import { format } from 'date-fns';
import { memo, useCallback, useMemo } from 'react';
import {
  StyledGridDate,
  StyledGridImage,
  StyledGridImageEmptyContainer,
  StyledGridImageEmptyText,
  StyledGridItem,
  StyledGridTextContainer,
  StyledGridTitle,
  StyledGridTop,
  StyledVenueText,
} from './concert-list.styled';

export const ConcertListItem = memo(
  ({ data }: { data: components['schemas']['ConcertDTOSchema'] }) => {
    const formattedDate = useMemo(() => {
      if (!data.date) {
        return '';
      }
      return format(new Date(data.date), 'EEE, MMM dd');
    }, [data.date]);
    const thumbUrl = useMemo(() => {
      if (isEmptySource(data.mainPoster?.url ?? '')) {
        return '';
      }
      return `${data.mainPoster?.url}`;
    }, [data.mainPoster]);

    const onClick = useCallback(() => {
      logEvent({
        name: 'click_event',
        params: { event_id: data.id },
      });
    }, [data.id]);

    const href = generateSlugHref(data.slug);

    return (
      <GlobalLink href={href} onClick={onClick}>
        <StyledGridItem>
          <StyledGridTop>
            {thumbUrl ? (
              <StyledGridImage src={thumbUrl} alt={data.title} />
            ) : (
              <StyledGridImageEmptyContainer>
                <StyledGridImageEmptyText>{data.title}</StyledGridImageEmptyText>
              </StyledGridImageEmptyContainer>
            )}
            {featureFlags.useSubscribeButton && (
              <FixedSubscribeEventButtonLayout>
                <SubscribeEventButton />
              </FixedSubscribeEventButtonLayout>
            )}
          </StyledGridTop>
          <StyledGridTextContainer>
            <StyledGridTitle as="p">{data.title}</StyledGridTitle>
            <StyledGridDate as="p">{formattedDate}</StyledGridDate>
            {data.mainVenue?.name && (
              <StyledVenueText as="p">{data.mainVenue.name}</StyledVenueText>
            )}
          </StyledGridTextContainer>
        </StyledGridItem>
      </GlobalLink>
    );
  }
);
