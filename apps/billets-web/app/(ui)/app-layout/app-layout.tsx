'use client'

import { PropsWithChildren } from 'react'
import { Footer } from '../../../ui/footer'
import { AppHeader } from '../app-header'
import { ChildrenWrapper, Container } from './app-layout.styled'

export function AppLayout({
  children,
}: PropsWithChildren<{
  accessToken?: string
  refreshToken?: string
}>) {
  return (
    <Container>
      <AppHeader />
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <Footer />
    </Container>
  )
}
