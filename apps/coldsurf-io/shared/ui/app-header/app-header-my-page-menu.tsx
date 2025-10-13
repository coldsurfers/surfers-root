'use client';

import { apiClient } from '@/libs/openapi-client';
import { featureFlags } from '@/shared/constants';
import { useIsLoggedIn } from '@/shared/lib';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { CircleUserRound as CircleUserRoundIcon } from 'lucide-react';
import { GlobalLink } from '../global-link';
import { HeaderMenuItem } from '../header-menu-item';

const StyledProfileIcon = styled(CircleUserRoundIcon)`
  width: 20px;
  height: 20px;
  color: ${semantics.color.foreground[1]};
`;

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
      <HeaderMenuItem isLoading={isLoading} icon={<StyledProfileIcon />}>
        나의 창꼬
      </HeaderMenuItem>
    </GlobalLink>
  );
};
