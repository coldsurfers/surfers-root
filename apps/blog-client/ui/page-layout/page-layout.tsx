'use client'

import { ColorSchemeToggle } from '@/features/color-scheme'
import { Link, usePathname } from 'i18n/routing'
import { PropsWithChildren } from 'react'
import { Header } from '../header/header'
import { BigTitle, BigTitleWrapper, StyledPageLayoutContainer } from './page-layout.styled'

export const PageLayout = ({
  children,
  title,
}: PropsWithChildren<{
  title?: string
}>) => {
  const pathname = usePathname()
  return (
    <StyledPageLayoutContainer>
      <div style={{ marginTop: '2rem' }}>
        <ColorSchemeToggle />
      </div>
      <BigTitleWrapper>
        <Link href="/" style={{ width: 1024 }}>
          <BigTitle as="h1">{title ?? 'The COLDSURF Blog'}</BigTitle>
        </Link>
      </BigTitleWrapper>
      {process.env.NODE_ENV === 'development' && pathname === '/about/[user]' ? null : <Header />}
      {children}
    </StyledPageLayoutContainer>
  )
}
