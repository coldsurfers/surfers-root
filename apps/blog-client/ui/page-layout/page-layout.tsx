'use client'

import { Header } from '@/ui'
import { PropsWithChildren } from 'react'
import { StyledPageLayoutContainer } from './page-layout.styled'

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <StyledPageLayoutContainer>
      <Header />
      {children}
    </StyledPageLayoutContainer>
  )
}
