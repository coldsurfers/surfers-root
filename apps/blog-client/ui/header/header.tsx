'use client'

import { useUIStore } from '@/stores'
import { Link, usePathname } from 'i18n/routing'
import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { StyledHeaderContainer, StyledHeaderHeading } from './header.styled'

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
      if (pathname.startsWith('/surflog')) {
        setActiveTab('surflog')
      } else if (pathname.startsWith('/techlog')) {
        setActiveTab('techlog')
      } else if (pathname === '/') {
        setActiveTab('main')
      } else if (pathname.startsWith('/writers')) {
        setActiveTab('writers')
      } else {
        setActiveTab(null)
      }
    }

    handleRouteChange(pathname)
  }, [pathname, setActiveTab])

  return (
    <StyledHeaderContainer>
      <Link href="/">
        <StyledHeaderHeading $isActive={activeTab === 'main' || pathname === '/'}>Main</StyledHeaderHeading>
      </Link>
      <Link href="/surflog">
        <StyledHeaderHeading $isActive={activeTab === 'surflog'}>Surflogs</StyledHeaderHeading>
      </Link>
      <Link href="/techlog">
        <StyledHeaderHeading $isActive={activeTab === 'techlog'}>Techlogs</StyledHeaderHeading>
      </Link>
      <Link href="/writers">
        <StyledHeaderHeading $isActive={activeTab === 'writers'}>Writers</StyledHeaderHeading>
      </Link>
    </StyledHeaderContainer>
  )
}
