'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { Header } from '../header/header';
import { BigTitle, BigTitleWrapper, StyledPageLayoutContainer } from './page-layout.styled';

export const PageLayout = ({
  children,
  title,
  isOfficialBlog,
}: PropsWithChildren<{
  title?: string;
  isOfficialBlog?: boolean;
}>) => {
  const pathname = usePathname();
  return (
    <StyledPageLayoutContainer>
      <BigTitleWrapper>
        <Link href={isOfficialBlog ? '/official-blog' : '/blog'} style={{ width: 'auto' }}>
          <BigTitle as="h1">
            {title ?? (isOfficialBlog ? 'COLDSURF BLOG' : '주인장의 소회')}
          </BigTitle>
        </Link>
      </BigTitleWrapper>
      {process.env.NODE_ENV === 'development' && pathname === '/blog/about/paul' ? null : (
        <Header isOfficialBlog={isOfficialBlog} />
      )}
      {children}
    </StyledPageLayoutContainer>
  );
};
