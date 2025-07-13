'use client';

import { featureFlags } from '@/shared/constants';
import { useIsLoggedIn } from '@/shared/lib';
import { Text } from '@coldsurfers/ocean-road';
import { AppHeaderMenuTextSkeleton, HeaderMenuContainerGlobalLink } from './app-header.styled';

export const AppHeaderMyPageMenu = () => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();

  if (!featureFlags.useProfileFeature || !isLoggedIn) {
    return null;
  }

  return (
    <HeaderMenuContainerGlobalLink href={'/@coldsurf'}>
      {isLoading ? <AppHeaderMenuTextSkeleton /> : <Text as="p">프로필</Text>}
    </HeaderMenuContainerGlobalLink>
  );
};
