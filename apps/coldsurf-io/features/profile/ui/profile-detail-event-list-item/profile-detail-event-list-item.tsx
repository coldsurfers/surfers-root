'use client';

import { format } from 'date-fns/format';
import {
  StyledArtistDetailEventListItem,
  StyledArtistDetailEventListItemDate,
  StyledArtistDetailEventListItemDescriptionWrapper,
  StyledArtistDetailEventListItemThumbnail,
  StyledArtistDetailEventListItemThumbnailEmpty,
  StyledArtistDetailEventListItemThumbnailEmptyText,
  StyledArtistDetailEventListItemTitle,
  StyledArtistDetailEventListItemVenueText,
} from '../profile-detail-event-list/profile-detail-event-list.styled';

export type ProfileDetailEventListItemProps = {
  href: string;
  thumbUrl?: string;
  title: string;
  date: string;
  venue: string;
};

export const ProfileDetailEventListItem = ({
  href,
  thumbUrl,
  title,
  venue,
  date,
}: ProfileDetailEventListItemProps) => {
  return (
    <StyledArtistDetailEventListItem href={href}>
      {thumbUrl ? (
        <StyledArtistDetailEventListItemThumbnail src={thumbUrl} />
      ) : (
        <StyledArtistDetailEventListItemThumbnailEmpty>
          <StyledArtistDetailEventListItemThumbnailEmptyText>
            {title}
          </StyledArtistDetailEventListItemThumbnailEmptyText>
        </StyledArtistDetailEventListItemThumbnailEmpty>
      )}
      <StyledArtistDetailEventListItemDescriptionWrapper>
        <StyledArtistDetailEventListItemTitle as="h4">{title}</StyledArtistDetailEventListItemTitle>
        <StyledArtistDetailEventListItemDate as="p">
          {format(new Date(date), 'EEE, MMM dd')}
        </StyledArtistDetailEventListItemDate>
        <StyledArtistDetailEventListItemVenueText>{venue}</StyledArtistDetailEventListItemVenueText>
      </StyledArtistDetailEventListItemDescriptionWrapper>
    </StyledArtistDetailEventListItem>
  );
};
