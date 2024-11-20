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
          <StyledHeaderHeading $isActive={pathname.startsWith('/surflog')}>{'🌊'}</StyledHeaderHeading>
        </Link>
        <Link href="/techlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/techlog')}>{'💻'}</StyledHeaderHeading>
        </Link>
        <Link href="/soundlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/soundlog')}>{'🎧'}</StyledHeaderHeading>
        </Link>
        <Link href="/filmlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/filmlog')}>{'🎥'}</StyledHeaderHeading>
        </Link>
        <Link href="/textlog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/textlog')}>{'📖'}</StyledHeaderHeading>
        </Link>
        <Link href="/squarelog">
          <StyledHeaderHeading $isActive={pathname.startsWith('/squarelog')}>{'📷'}</StyledHeaderHeading>
        </Link>
        <Link href="/writers">
          <StyledHeaderHeading $isActive={pathname.startsWith('/writers')}>{'🧑🏻‍💻'}</StyledHeaderHeading>
        </Link>
      </StyledHeaderContainer>
    </StyledHeaderBigContainer>
  )
}
