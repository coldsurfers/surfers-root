'use client'

import { PropsWithChildren } from 'react'
import { StyledPageLayoutContainer } from './page-layout.styled'

export const PageLayout = ({ children }: PropsWithChildren) => {
  return <StyledPageLayoutContainer>{children}</StyledPageLayoutContainer>
}
