'use client';

import { apiClient } from '@/libs/openapi-client';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ProfileDetailEventList } from '../../ui';
import {
  StyledArtistDetailEventListItem,
  StyledArtistDetailEventListItemDescriptionWrapper,
  StyledArtistDetailEventListItemThumbnail,
  StyledArtistDetailEventListItemThumbnailEmpty,
  StyledArtistDetailEventListItemThumbnailEmptyText,
  StyledArtistDetailEventListItemTitle,
} from '../../ui/profile-detail-event-list/profile-detail-event-list.styled';

type Props = {
  artistId: string;
};

export const ArtistProfileDetailEventList = ({ artistId }: Props) => {
  const { data: artistDetail } = useQuery({
    queryKey: apiClient.artist.queryKeys.detail(artistId),
    queryFn: () => apiClient.artist.getArtistDetail(artistId),
  });

  const upcomingEvents = useMemo(() => {
    return artistDetail?.upcomingEvents ?? [];
  }, [artistDetail?.upcomingEvents]);

  return (
    <ProfileDetailEventList
      title={'Upcoming Events'}
      data={upcomingEvents.map((event) => {
        const thumbUrl = event.data.mainPoster?.url ? `${event.data.mainPoster.url}` : '';
        return {
          date: event.data.date,
          href: generateSlugHref(event.data.slug),
          thumbUrl,
          title: event.data.title,
          venue: event.data.mainVenue?.name ?? '',
        };
      })}
    />
  );
};
