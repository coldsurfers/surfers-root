'use client';

import { apiClient } from '@/libs/openapi-client';
import { authUtils } from '@/libs/utils/utils.auth';
import { Spinner, breakpoints } from '@coldsurfers/ocean-road';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppHeaderLogo } from './app-header-logo';
import { AppHeaderMobileMenuOpener, AppHeaderMobileModalMenu } from './app-header-mobile-menu';
import { AppHeaderWebMenu } from './app-header-web-menu';
import { HeaderContainer } from './app-header.styled';

export function AppHeader({ isServerSideLoggedIn }: { isServerSideLoggedIn: boolean }) {
  const router = useRouter();
  const [animation, setAnimation] = useState<'show' | 'hide'>('show');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });

  const isLoggedIn = isServerSideLoggedIn || !!userData;

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: () => authUtils.localLogout(),
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    let lastScrollTop = 0;
    const onScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        setAnimation('hide');
      } else {
        setAnimation('show');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    };
    const onResize = () => {
      if (window.innerWidth > breakpoints.large) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <HeaderContainer $animation={animation}>
        <AppHeaderLogo />
        <AppHeaderWebMenu isLoggedIn={isLoggedIn} logout={logout} isLoading={isLoadingUser} />
        <AppHeaderMobileMenuOpener onClick={() => setIsModalOpen(true)} />
      </HeaderContainer>
      <AppHeaderMobileModalMenu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoggedIn={isLoggedIn}
        logout={logout}
        isLoading={isLoadingUser}
      />
      {isLogoutPending && <Spinner variant="page-overlay" />}
    </>
  );
}
