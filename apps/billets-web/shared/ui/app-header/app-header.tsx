'use client';

import { useIsLoggedIn } from '@/shared/lib';
import { breakpoints } from '@coldsurfers/ocean-road';
import { useEffect, useState } from 'react';
import { AppHeaderLogo } from './app-header-logo';
import { AppHeaderMobileMenuOpener, AppHeaderMobileModalMenu } from './app-header-mobile-menu';
import { AppHeaderWebMenu } from './app-header-web-menu';
import { HeaderContainer } from './app-header.styled';

export function AppHeader() {
  const [animation, setAnimation] = useState<'show' | 'hide'>('show');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading: isLoadingUser } = useIsLoggedIn();

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
        <AppHeaderWebMenu
          onClickMobileLogout={() => setIsModalOpen(false)}
          isLoading={isLoadingUser}
        />
        <AppHeaderMobileMenuOpener onClick={() => setIsModalOpen(true)} />
      </HeaderContainer>
      <AppHeaderMobileModalMenu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoadingUser}
      />
    </>
  );
}
