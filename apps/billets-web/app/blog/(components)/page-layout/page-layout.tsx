'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { Header } from '../header/header';
import { BigTitle, BigTitleWrapper, StyledPageLayoutContainer } from './page-layout.styled';

export const PageLayout = ({
  children,
  title,
}: PropsWithChildren<{
  title?: string;
}>) => {
  const pathname = usePathname();
  return (
    <StyledPageLayoutContainer>
      <BigTitleWrapper>
        <Link href="/blog" style={{ width: 'auto' }}>
          <BigTitle as="h1">{title ?? 'The COLDSURF Blog'}</BigTitle>
        </Link>
      </BigTitleWrapper>
      {process.env.NODE_ENV === 'development' && pathname === '/blog/about/paul' ? null : (
        <Header />
      )}
      {children}
    </StyledPageLayoutContainer>
  );
};
