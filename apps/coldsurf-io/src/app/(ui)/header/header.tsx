'use client';

import { menuItems } from '../../(data)';
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
            <StyledMenuItem key={item.href} href={item.href} target={item.target}>
              <StyledMenuText as="span">{item.title}</StyledMenuText>
            </StyledMenuItem>
          ))}
        </StyledMenuContainer>
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
