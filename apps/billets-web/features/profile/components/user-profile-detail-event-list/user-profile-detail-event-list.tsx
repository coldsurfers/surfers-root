'use client';

import { apiClient } from '@/libs/openapi-client';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { useQuery } from '@tanstack/react-query';
import { ProfileDetailEventList } from '../../ui';

type Props = {
  handle: string;
};

export const UserProfileDetailEventList = ({ handle }: Props) => {
  const { data: userProfile } = useQuery({
    queryKey: apiClient.user.queryKeys.profile(handle),
    queryFn: () => apiClient.user.getUserProfile(handle),
  });

  if (!userProfile) {
    return null;
  }

  return (
    <ProfileDetailEventList
      title={'찜한 공연'}
      data={userProfile.subscribedEvents.map((event) => {
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
