'use client';

import { AppHeader } from '@/shared/ui';
import { LoginSideBar } from '@/shared/ui';
import { type PropsWithChildren, useEffect } from 'react';
import { AppFooter } from '../app-footer';
import { FloatingSearchBar } from '../floating-search-bar';
import { PageLayoutUI } from '../page-layout-ui';
import { ChildrenWrapper, Container } from './app-layout.styled';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <Container>
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
