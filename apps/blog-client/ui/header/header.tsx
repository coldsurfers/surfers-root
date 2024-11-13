'use client'

import { Link, usePathname } from 'i18n/routing'
import {
  StyledHeaderBigContainer,
  StyledHeaderContainer,
  StyledHeaderHeading,
  StyledHeaderTitle,
} from './header.styled'

export const Header = () => {
  const pathname = usePathname()

  return (
    <StyledHeaderBigContainer>
      <Link href={'/'}>
        <StyledHeaderTitle as="h1">Blog, COLDSURF</StyledHeaderTitle>
      </Link>
      <StyledHeaderContainer>
        <Link href="/surflog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/surflog')}>Surflogs</StyledHeaderHeading>
        </Link>
        <Link href="/techlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/techlog')}>Techlogs</StyledHeaderHeading>
        </Link>
        <Link href="/writers">
          <StyledHeaderHeading $isActive={pathname.startsWith('/writers')}>Writers</StyledHeaderHeading>
        </Link>
      </StyledHeaderContainer>
    </StyledHeaderBigContainer>
  )
}
