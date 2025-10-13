'use client';

// @TODO: remove this file

import { apiClient } from '@/libs/openapi-client';
import { authUtils } from '@/libs/utils/utils.auth';
import { useIsLoggedIn } from '@/shared/lib';
import { Spinner } from '@coldsurfers/ocean-road';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { GlobalLink } from '../global-link';
import { HeaderMenuItem } from '../header-menu-item';
import { HeaderMenuContainerButton } from './app-header.styled';

export const AppHeaderLoginMenu = ({
  onClickMobileLogout,
}: {
  onClickMobileLogout: () => void;
}) => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();
  const queryClient = useQueryClient();
  const pathname = usePathname();

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

  return (
    <>
      {isLoggedIn ? (
        <HeaderMenuContainerButton onClick={() => logout()}>
          <HeaderMenuItem isLoading={isLoading} isCurrent={pathname.includes('/login')}>
            로그아웃
          </HeaderMenuItem>
        </HeaderMenuContainerButton>
      ) : (
        <GlobalLink href={'/login'} onClick={onClickMobileLogout}>
          <HeaderMenuItem isLoading={isLoading} isCurrent={pathname.includes('/login')}>
            로그인
          </HeaderMenuItem>
        </GlobalLink>
      )}
      {isLogoutPending && <Spinner variant="page-overlay" />}
    </>
  );
};
