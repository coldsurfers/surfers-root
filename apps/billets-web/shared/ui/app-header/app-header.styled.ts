'use client';

import { GLOBAL_Z_INDEX } from '@/libs/constants';
import { IconButton, Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AlignRight, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { APP_HEADER_HEIGHT } from '../constants';
import { GlobalLink } from '../global-link';

export const HeaderContainer = styled.header<{ $animation: 'show' | 'hide' }>`
  display: flex;
  align-items: center;
  height: ${APP_HEADER_HEIGHT};
  padding: 0 40px;

  background-color: ${semantics.color.background[2]};
  z-index: ${GLOBAL_Z_INDEX.APP_HEADER};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  transition: all 0.3s ease-in-out;
  transform: translateY(${({ $animation }) => ($animation === 'show' ? '0' : '-100%')});

  ${media.large(css`
    padding: 0 16px;
  `)}
`;

export const HeaderTitle = styled(Text)`
  font-size: 32px;
  font-weight: 800;
  color: ${semantics.color.foreground[1]};

  ${media.large(css`
    font-size: 24px;
  `)}
`;

export const HeaderLogo = styled.img`
  border-radius: 50%;
  margin-right: 12px;

  width: 42px;
  height: 42px;

  ${media.large(css`
    width: 36px;
    height: 36px;
  `)}
`;

export const HeaderMenuContainerGlobalLink = styled(GlobalLink)`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const HeaderMenuContainerLink = styled(Link)`
  background-color: transparent;
  border: none;
  cursor: pointer;

  ${media.large(css`
    padding: 0;
  `)}
`;

export const HeaderMenuContainerButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;

  ${media.large(css`
    padding: 0;
  `)}
`;

export const WebMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.large(css`
    display: none;
  `)}
`;

export const MobileMenuContainer = styled.div`
  display: none;

  ${media.large(css`
    display: flex;
  `)}
`;

export const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.5px);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: ${GLOBAL_Z_INDEX.MOBILE_MENU_MODAL};
`;

export const ModalPaper = styled.div`
  background: ${semantics.color.background[2]};
  border-radius: 8px;
  padding: 20px;
  margin: 12px auto;
  width: calc(100vw - 24px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const ModalContent = styled.div`
  margin: 10px 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MobileMenuIcon = styled(AlignRight)`
  color: ${semantics.color.foreground[3]};
`;

export const SearchIconUI = styled(SearchIcon)`
  width: 24px;
  height: 24px;
  color: ${semantics.color.foreground[1]};
`;

export const SearchIconWrapper = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${semantics.color.background[3]};
  border-radius: 50%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  border: none;

  cursor: pointer;

  ${media.large(css`
    margin-right: 0.5rem;
  `)}
`;
