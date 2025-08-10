'use client';

import { ColorSchemeToggle } from 'app/(ui)';
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
  StyledMenuItem,
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
          {menuItems.map((item) => (
            <StyledMenuItem key={item.link} href={item.link}>
              <StyledMenuText as="span">{item.title}</StyledMenuText>
            </StyledMenuItem>
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
