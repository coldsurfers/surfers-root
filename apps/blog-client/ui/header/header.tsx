'use client'

import { usePathname } from 'i18n/routing'
import {
  StyledHeaderBigContainer,
  StyledHeaderContainer,
  StyledHeaderHeading,
  StyledHeaderLinkBadge,
} from './header.styled'

export const Header = () => {
  const pathname = usePathname()

  return (
    <StyledHeaderBigContainer>
      <StyledHeaderContainer>
        <StyledHeaderLinkBadge href="/techlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/techlog')}>{'TECH'}</StyledHeaderHeading>
        </StyledHeaderLinkBadge>
        <StyledHeaderLinkBadge href="/soundlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/soundlog')}>{'MUSIC'}</StyledHeaderHeading>
        </StyledHeaderLinkBadge>
        <StyledHeaderLinkBadge href="/filmlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/filmlog')}>{'VIDEO'}</StyledHeaderHeading>
        </StyledHeaderLinkBadge>
        <StyledHeaderLinkBadge href="/textlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/textlog')}>{'TEXT'}</StyledHeaderHeading>
        </StyledHeaderLinkBadge>
        <StyledHeaderLinkBadge href="/squarelog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/squarelog')}>{'PHOTO'}</StyledHeaderHeading>
        </StyledHeaderLinkBadge>
        <StyledHeaderLinkBadge href="/about">
          <StyledHeaderHeading $isActive={pathname.startsWith('/writers')}>{'ABOUT'}</StyledHeaderHeading>
        </StyledHeaderLinkBadge>
      </StyledHeaderContainer>
    </StyledHeaderBigContainer>
  )
}
