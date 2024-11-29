'use client'

import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import Header from '../features/layout/Header'
import { HEADER_HEIGHT } from '../features/layout/Header.constants'
import Footer from './Footer'

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

export default function LayoutWrapper({
  children,
}: PropsWithChildren<{
  accessToken?: string
  refreshToken?: string
}>) {
  return (
    <Container>
      <Header />
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <Footer />
    </Container>
  )
}
