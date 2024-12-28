'use client'

import {
  StyledCloseIcon,
  StyledCloseIconButton,
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoImage,
  StyledLogoText,
  StyledLogoWrapper,
  StyledMenuContainer,
  StyledMenuItem,
  StyledMenuText,
  StyledMobileMenuIcon,
} from './header.styled'
import { HeaderProps } from './header.types'

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

export function Header({ onClickMenuIcon, isMobileMenuOpen, onClickCloseMobileMenuIcon }: HeaderProps) {
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
        <StyledCloseIconButton $isOpen={isMobileMenuOpen}>
          {isMobileMenuOpen ? (
            <StyledCloseIcon onClick={onClickCloseMobileMenuIcon} />
          ) : (
            <StyledMobileMenuIcon onClick={onClickMenuIcon} />
          )}
        </StyledCloseIconButton>
      </StyledHeader>
    </StyledHeaderWrapper>
  )
}
