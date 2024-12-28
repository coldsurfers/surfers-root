'use client'

import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoImage,
  StyledLogoText,
  StyledLogoWrapper,
  StyledMenuContainer,
  StyledMenuItem,
  StyledMenuText,
} from './header.styled'

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
        <StyledLogoWrapper href="/">
          <StyledLogoImage src={'/icons/favicon.ico'} width={48} height={48} alt={'LOGO'} />
          <StyledLogoText as="h2">COLDSURF</StyledLogoText>
        </StyledLogoWrapper>
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
