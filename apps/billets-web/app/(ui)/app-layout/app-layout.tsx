'use client';

import { AppHeader, LoginSideBar } from '@/shared/ui';
import { usePathname } from 'next/navigation';
import { type PropsWithChildren, useEffect } from 'react';
import { AppFooter } from '../app-footer';
import { FloatingSearchBar } from '../floating-search-bar';
import { PageLayoutUI } from '../page-layout-ui';
import { ChildrenWrapper, Container } from './app-layout.styled';

export function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <Container $isHome={pathname === '/'}>
      <AppHeader />
      <ChildrenWrapper>
        <PageLayoutUI>{children}</PageLayoutUI>
      </ChildrenWrapper>
      <AppFooter />
      <FloatingSearchBar />
      <LoginSideBar />
    </Container>
  );
}
