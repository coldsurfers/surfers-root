'use client'

import { Text } from '@coldsurfers/ocean-road'
import Image from 'next/image'
import Link from 'next/link'
import { StyledHeader, StyledHeaderWrapper, StyledMenuContainer, StyledMenuItem, StyledMenuText } from './header.styled'

const menuItems = [
  {
    title: 'Products',
    href: '/products',
    target: undefined,
  },
  {
    title: 'Blog',
    href: 'https://blog.coldsurf.io',
    target: '_blank',
  },
] as const

export function Header() {
  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <Link href="/" style={{ paddingLeft: '32px', marginRight: '48px', display: 'flex', alignItems: 'center' }}>
          <Image
            src={'/icons/favicon.ico'}
            width={32}
            height={32}
            alt={'LOGO'}
            style={{
              borderRadius: '50%',
              marginRight: '0.5rem',
            }}
          />
          <Text as="h2">COLDSURF</Text>
        </Link>
        <StyledMenuContainer>
          {menuItems.map((item) => (
            <StyledMenuItem key={item.href} href={item.href} target={item.target}>
              <StyledMenuText as="span">{item.title}</StyledMenuText>
            </StyledMenuItem>
          ))}
        </StyledMenuContainer>
      </StyledHeader>
    </StyledHeaderWrapper>
  )
}
