'use client';

import { useAuthStore } from '@/libs/stores';
import { type PropsWithChildren, useEffect } from 'react';
import { AppFooter } from '../app-footer';
import { AppHeader } from '../app-header';
import { FloatingSearchBar } from '../floating-search-bar';
import { PageLayoutUI } from '../page-layout-ui';
import { ChildrenWrapper, Container } from './app-layout.styled';

export function AppLayout({
  children,
  isServerSideLoggedIn,
}: PropsWithChildren<{
  isServerSideLoggedIn: boolean;
}>) {
  const { isLoggedIn: isClientSideLoggedIn, setIsLoggedIn: setIsClientSideLoggedIn } =
    useAuthStore();
  const isLoggedIn = isServerSideLoggedIn || isClientSideLoggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      setIsClientSideLoggedIn(true);
    }
  }, [isLoggedIn, setIsClientSideLoggedIn]);

  return (
    <Container>
      <AppHeader isLoggedIn={isLoggedIn} />
      <ChildrenWrapper>
        <PageLayoutUI>{children}</PageLayoutUI>
      </ChildrenWrapper>
      <AppFooter />
      <FloatingSearchBar />
    </Container>
  );
}
