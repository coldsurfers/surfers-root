'use client';

import { apiClient } from '@/libs/openapi-client';
import { authUtils } from '@/libs/utils/utils.auth';
import { Spinner } from '@coldsurfers/ocean-road';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useIsLoggedIn } from 'app/(hooks)/use-is-logged-in';
import { useIsSsgPath } from 'app/(hooks)/use-is-ssg-path';
import { GlobalLink } from '../global-link';
import {
  AppHeaderMenuTextSkeleton,
  HeaderMenuContainerButton,
  HeaderMenuText,
} from './app-header.styled';

export const AppHeaderLoginMenu = ({
  onClickMobileLogout,
}: {
  onClickMobileLogout: () => void;
}) => {
  const isSsgPath = useIsSsgPath();
  const { isLoggedIn, isLoading } = useIsLoggedIn();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: () => authUtils.localLogout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: apiClient.user.queryKeys.me });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (isSsgPath) {
    return null;
  }

  return (
    <>
      {isLoggedIn ? (
        <HeaderMenuContainerButton onClick={() => logout()}>
          {isLoading ? (
            <AppHeaderMenuTextSkeleton />
          ) : (
            <HeaderMenuText as="p">로그아웃</HeaderMenuText>
          )}
        </HeaderMenuContainerButton>
      ) : (
        <GlobalLink href={'/login'} onClick={onClickMobileLogout}>
          {isLoading ? (
            <AppHeaderMenuTextSkeleton />
          ) : (
            <HeaderMenuText as="p">로그인</HeaderMenuText>
          )}
        </GlobalLink>
      )}
      {isLogoutPending && <Spinner variant="page-overlay" />}
    </>
  );
};
