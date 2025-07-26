'use client';

import { apiClient } from '@/libs/openapi-client';
import { featureFlags } from '@/shared/constants';
import { useIsLoggedIn } from '@/shared/lib';
import { Text } from '@coldsurfers/ocean-road';
import { useQuery } from '@tanstack/react-query';
import { GlobalLink } from '../global-link';
import { AppHeaderMenuTextSkeleton, HeaderMenuContainerGlobalLink } from './app-header.styled';

type Props = {
  onClick: () => void;
};

export const AppHeaderMyPageMenu = ({ onClick }: Props) => {
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
    <GlobalLink href={`/${userHandle}`} onClick={onClick}>
      {isLoading ? <AppHeaderMenuTextSkeleton /> : <Text as="p">프로필</Text>}
    </GlobalLink>
  );
};
