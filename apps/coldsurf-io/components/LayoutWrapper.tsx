'use client'

import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginModal } from './LoginModal'
import Footer from './Footer'
import { useLoginModalStore } from '../stores/loginModalStore'
import Header from '../features/layout/Header'
import { HEADER_HEIGHT } from '../features/layout/Header.constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
`

const ChildrenWrapper = styled.div`
  flex: 1;
  padding-top: ${HEADER_HEIGHT};
`

export const queryClient = new QueryClient({})

export default function LayoutWrapper({
  children,
}: PropsWithChildren<{
  accessToken?: string
  refreshToken?: string
}>) {
  const { isOpen, close } = useLoginModalStore()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Header />
          <ChildrenWrapper>{children}</ChildrenWrapper>
          <Footer />
          <LoginModal isOpen={isOpen} onClickBackground={close} />
        </Container>
      </QueryClientProvider>
    </>
  )
}
