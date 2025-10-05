'use client';

import { apiClient } from '@/libs/openapi-client';
import { useQuery } from '@tanstack/react-query';
import { ProfileDetailTop } from '../../ui';

type Props = {
  handle: string;
};

export const UserProfileDetailTop = ({ handle }: Props) => {
  const { data: userProfile } = useQuery({
    queryKey: apiClient.user.queryKeys.profile(handle),
    queryFn: () => apiClient.user.getUserProfile(handle),
  });

  if (!userProfile) {
    return null;
  }

  return (
    <ProfileDetailTop
      profileKind="User"
      title={userProfile.handle}
      thumbUrl={''}
      imgModalThumbUrl={''}
      thumbCopyright={undefined}
    />
  );
};
