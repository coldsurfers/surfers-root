'use client'

import { ColorSchemeToggle } from '@/features/color-scheme'
import { Link, usePathname } from 'i18n/routing'
import { PropsWithChildren } from 'react'
import { Header } from '../header/header'
import { BigTitle, BigTitleWrapper, StyledPageLayoutContainer } from './page-layout.styled'

export const PageLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  return (
    <StyledPageLayoutContainer>
      <div style={{ marginTop: '2rem' }}>
        <ColorSchemeToggle />
      </div>
      <BigTitleWrapper>
        <Link href="/" style={{ width: 'auto' }}>
          <BigTitle as="h1">The COLDSURF Blog</BigTitle>
        </Link>
      </BigTitleWrapper>
      {process.env.NODE_ENV === 'development' && pathname === '/resume' ? null : <Header />}
      {children}
    </StyledPageLayoutContainer>
  )
}
