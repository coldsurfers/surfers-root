'use client';

import { HeaderMenuItem } from '@/shared/ui';
import { ColorSchemeToggle } from 'app/(ui)';
import Link from 'next/link';
import { menuItems } from '../constants';
import {
  ColorSchemeToggleContainer,
  StyledCloseIcon,
  StyledCloseIconButton,
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoImage,
  StyledLogoText,
  StyledLogoWrapper,
  StyledMenuContainer,
  StyledMenuText,
  StyledMobileMenuIcon,
} from './header.styled';
import type { HeaderProps } from './header.types';

export function Header({
  onClickMenuIcon,
  isMobileMenuOpen,
  onClickCloseMobileMenuIcon,
}: HeaderProps) {
  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <StyledLogoWrapper href="/">
          <StyledLogoImage src={'/icons/favicon.ico'} width={48} height={48} alt={'LOGO'} />
          <StyledLogoText as="h2">COLDSURF</StyledLogoText>
        </StyledLogoWrapper>
        <StyledMenuContainer>
          {menuItems
            .filter((item) => item.visible)
            .map((item) => (
              <Link key={item.link} href={item.link}>
                <HeaderMenuItem>
                  <StyledMenuText as="span">{item.title}</StyledMenuText>
                </HeaderMenuItem>
              </Link>
            ))}
        </StyledMenuContainer>
        <ColorSchemeToggleContainer>
          <ColorSchemeToggle />
        </ColorSchemeToggleContainer>
        <StyledCloseIconButton
          $isOpen={isMobileMenuOpen}
          onClick={() => (isMobileMenuOpen ? onClickCloseMobileMenuIcon() : onClickMenuIcon())}
        >
          {isMobileMenuOpen ? (
            <StyledCloseIcon onClick={onClickCloseMobileMenuIcon} />
          ) : (
            <StyledMobileMenuIcon onClick={onClickMenuIcon} />
          )}
        </StyledCloseIconButton>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
}
