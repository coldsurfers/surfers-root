'use client'

import { ColorSchemeToggle } from '@/features/color-scheme'
import { Text } from '@coldsurfers/ocean-road'
import { usePathname } from 'i18n/routing'
import { PropsWithChildren } from 'react'
import { Header } from '../header/header'
import { StyledPageLayoutContainer } from './page-layout.styled'

export const PageLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  return (
    <StyledPageLayoutContainer>
      <div style={{ marginTop: '2rem' }}>
        <ColorSchemeToggle />
      </div>
      <Text
        as="h1"
        style={{
          fontSize: '88px',
          fontWeight: 820,
          lineHeight: '1.05',
          textAlign: 'center',
          marginTop: '10rem',
        }}
      >
        The COLDSURF Blog
      </Text>
      {process.env.NODE_ENV === 'development' && pathname === '/resume' ? null : <Header />}
      {children}
    </StyledPageLayoutContainer>
  )
}
