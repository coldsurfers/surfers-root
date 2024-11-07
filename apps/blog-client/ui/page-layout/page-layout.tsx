'use client'

import { Header } from '@/ui'
import { usePathname } from 'i18n/routing'
import { PropsWithChildren } from 'react'
import { StyledPageLayoutContainer } from './page-layout.styled'

export const PageLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  return (
    <StyledPageLayoutContainer>
      {process.env.NODE_ENV === 'development' && pathname === '/resume' ? null : <Header />}
      {children}
    </StyledPageLayoutContainer>
  )
}
