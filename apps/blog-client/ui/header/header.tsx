'use client'

import { useUIStore } from '@/stores'
import { Link, usePathname } from 'i18n/routing'
import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import {
  StyledHeaderBigContainer,
  StyledHeaderContainer,
  StyledHeaderHeading,
  StyledHeaderTitle,
} from './header.styled'

export const Header = () => {
  const pathname = usePathname()
  const { activeTab, setActiveTab } = useUIStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
    })),
  )

  useEffect(() => {
    const handleRouteChange = (pathname: string) => {
      switch (true) {
        case pathname.startsWith('/surflog'):
          setActiveTab('surflog')
          break
        case pathname.startsWith('/techlog'):
          setActiveTab('techlog')
          break
        case pathname.startsWith('/writers'):
          setActiveTab('writers')
          break
        default:
          setActiveTab(null)
      }
    }

    handleRouteChange(pathname)
  }, [pathname, setActiveTab])

  return (
    <StyledHeaderBigContainer>
      <Link href={'/'}>
        <StyledHeaderTitle as="h1">Blog, COLDSURF</StyledHeaderTitle>
      </Link>
      <StyledHeaderContainer>
        <Link href="/surflog">
          <StyledHeaderHeading $isActive={activeTab === 'surflog' || pathname.startsWith('/surflog')}>
            Surflogs
          </StyledHeaderHeading>
        </Link>
        <Link href="/techlog">
          <StyledHeaderHeading $isActive={activeTab === 'techlog' || pathname.startsWith('/techlog')}>
            Techlogs
          </StyledHeaderHeading>
        </Link>
        <Link href="/writers">
          <StyledHeaderHeading $isActive={activeTab === 'writers' || pathname.startsWith('/writers')}>
            Writers
          </StyledHeaderHeading>
        </Link>
      </StyledHeaderContainer>
    </StyledHeaderBigContainer>
  )
}
