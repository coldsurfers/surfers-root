'use client';

import { apiClient } from '@/libs/openapi-client';
import { featureFlags } from '@/shared/constants';
import { useIsLoggedIn } from '@/shared/lib';
import { Text } from '@coldsurfers/ocean-road';
import { useQuery } from '@tanstack/react-query';
import { AppHeaderMenuTextSkeleton, HeaderMenuContainerGlobalLink } from './app-header.styled';

export const AppHeaderMyPageMenu = () => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();
  const { data: userData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });
  const userHandle = userData?.handle;

  if (!featureFlags.useProfileFeature || !isLoggedIn || !userHandle) {
    return null;
  }

  return (
    <HeaderMenuContainerGlobalLink href={`/@${userHandle}`}>
      {isLoading ? <AppHeaderMenuTextSkeleton /> : <Text as="p">프로필</Text>}
    </HeaderMenuContainerGlobalLink>
  );
};
