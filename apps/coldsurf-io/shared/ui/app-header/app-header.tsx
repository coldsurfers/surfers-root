'use client';

import { useIsLoggedIn, useNotFoundContext } from '@/shared/lib';
import { breakpoints } from '@coldsurfers/ocean-road';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { HEADER_MENU_ITEMS } from '../constants';
import { AppHeaderLogo } from './app-header-logo';
import { AppHeaderMobileMenuOpener, AppHeaderMobileModalMenu } from './app-header-mobile-menu';
import { AppHeaderWebMenu } from './app-header-web-menu';
import { HeaderContainer } from './app-header.styled';

export function AppHeader() {
  const pathname = usePathname();
  const isCurrentPathDefaultHeader = useMemo(() => {
    const targetMenu = HEADER_MENU_ITEMS.find((item) => pathname.includes(item.link));
    if (targetMenu) {
      return targetMenu.isDefaultHeader;
    }
    return true;
  }, [pathname]);
  const [animation, setAnimation] = useState<'show' | 'hide'>('show');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading: isLoadingUser } = useIsLoggedIn();
  const { isNotFound } = useNotFoundContext();

  const isVisible = !isCurrentPathDefaultHeader || isNotFound;

  useEffect(() => {
    let lastScrollTop = 0;
    const onScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const diff = Math.abs(currentScroll - lastScrollTop);
      if (diff >= 30) {
        if (currentScroll > lastScrollTop) {
          setAnimation('hide');
        } else {
          setAnimation('show');
        }
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

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <HeaderContainer $animation={animation}>
        <AppHeaderLogo />
        <AppHeaderWebMenu onClose={() => setIsModalOpen(false)} isLoading={isLoadingUser} />
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
