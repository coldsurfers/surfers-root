'use client'

import { useUIStore } from '@/stores'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
      }
      if (pathname.startsWith('/techlog')) {
        setActiveTab('techlog')
      }
      if (pathname === '/') {
        setActiveTab('main')
      }
      if (pathname === '/writers') {
        setActiveTab('writers')
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
