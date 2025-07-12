'use client';

import { apiClient } from '@/libs/openapi-client';
import { authUtils } from '@/libs/utils/utils.auth';
import { Spinner } from '@coldsurfers/ocean-road';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useIsLoggedIn } from 'app/(hooks)/use-is-logged-in';
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
  const { isLoggedIn, isLoading } = useIsLoggedIn();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: () => authUtils.localLogout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: apiClient.user.queryKeys.me });
      onClickMobileLogout();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading) {
    return <AppHeaderMenuTextSkeleton />;
  }

  return (
    <>
      {isLoggedIn ? (
        <HeaderMenuContainerButton onClick={() => logout()}>
          <HeaderMenuText as="p">로그아웃</HeaderMenuText>
        </HeaderMenuContainerButton>
      ) : (
        <GlobalLink href={'/login'} onClick={onClickMobileLogout}>
          <HeaderMenuText as="p">로그인</HeaderMenuText>
        </GlobalLink>
      )}
      {isLogoutPending && <Spinner variant="page-overlay" />}
    </>
  );
};
