'use client'

import { usePathname } from 'i18n/routing'
import { I18nPathWithParams } from 'i18n/types'
import { memo, useMemo } from 'react'
import {
  StyledHeaderBigContainer,
  StyledHeaderContainer,
  StyledHeaderHeading,
  StyledHeaderLinkBadge,
} from './header.styled'

const HeaderBadge = memo(
  ({ href, isActive, title }: { href: I18nPathWithParams; isActive: boolean; title: string }) => {
    return (
      <StyledHeaderLinkBadge href={href} $isactive={isActive ? 'true' : undefined}>
        <StyledHeaderHeading $isactive={isActive ? 'true' : undefined}>{title}</StyledHeaderHeading>
      </StyledHeaderLinkBadge>
    )
  },
)

export const Header = () => {
  const pathname = usePathname()

  const data = useMemo<
    {
      href: I18nPathWithParams
      title: string
      isActive: boolean
    }[]
  >(() => {
    return [
      {
        href: {
          pathname: '/techlog',
        },
        title: 'TECH',
        isActive: pathname.startsWith('/techlog'),
      },
      {
        href: {
          pathname: '/soundlog',
        },
        title: 'SOUND',
        isActive: pathname.startsWith('/soundlog'),
      },
      {
        href: {
          pathname: '/filmlog',
        },
        title: 'VIDEO',
        isActive: pathname.startsWith('/filmlog'),
      },
      {
        href: {
          pathname: '/textlog',
        },
        title: 'TEXT',
        isActive: pathname.startsWith('/textlog'),
      },
      {
        href: {
          pathname: '/about',
        },
        title: 'ABOUT',
        isActive: pathname.startsWith('/about'),
      },
    ]
  }, [pathname])

  return (
    <StyledHeaderBigContainer>
      <StyledHeaderContainer>
        {data.map((item) => (
          <HeaderBadge key={item.href.pathname} {...item} />
        ))}
      </StyledHeaderContainer>
    </StyledHeaderBigContainer>
  )
}
