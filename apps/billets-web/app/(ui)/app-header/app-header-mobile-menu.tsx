'use client';

import { APP_DOWNLOAD_WORDING } from '@/libs/constants';
import { Button, IconButton, Text } from '@coldsurfers/ocean-road';
import { APP_STORE_URL } from '@coldsurfers/shared-utils';
import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useCallback, useEffect } from 'react';
import { GlobalLink } from '../global-link';
import { AppHeaderSearchUI } from './app-header.search-ui';
import {
  AppHeaderMenuTextSkeleton,
  HeaderMenuContainerButton,
  HeaderMenuText,
  MobileMenuContainer,
  MobileMenuIcon,
  ModalContainer,
  ModalContent,
  ModalPaper,
} from './app-header.styled';
import { commonMenuItems } from './constants';

export const AppHeaderMobileMenuOpener = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <MobileMenuContainer>
      <AppHeaderSearchUI />
      <IconButton onClick={onClick}>
        <MobileMenuIcon />
      </IconButton>
    </MobileMenuContainer>
  );
};

export const AppHeaderMobileModalMenu = ({
  isOpen,
  onClose,
  isLoggedIn,
  logout,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  logout: () => void;
  isLoading: boolean;
}) => {
  const router = useRouter();

  useEffect(() => {
    const { body } = document;
    if (isOpen) {
      body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      body.style.overflow = ''; // Reset overflow to enable scrolling
    }
    return () => {
      body.style.overflow = ''; // Clean up on unmount
    };
  }, [isOpen]);

  const onClickLogout = useCallback(() => {
    logout();
    onClose();
  }, [logout, onClose]);

  return (
    <ModalContainer onClick={onClose} $isOpen={isOpen} style={{ overflowY: 'auto' }}>
      {isOpen && (
        <ModalPaper onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            {commonMenuItems.map((item) => {
              const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
                onClose();
                if (item.link === '/browse') {
                  e.preventDefault();
                  router.push('/browse/seoul');
                }
              };
              return (
                <GlobalLink
                  key={item.link}
                  href={item.link}
                  target={item.target}
                  onClick={onClick}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {isLoading ? <AppHeaderMenuTextSkeleton /> : <Text as="p">{item.title}</Text>}
                </GlobalLink>
              );
            })}
            {isLoggedIn ? (
              <HeaderMenuContainerButton onClick={onClickLogout}>
                {isLoading ? (
                  <AppHeaderMenuTextSkeleton />
                ) : (
                  <HeaderMenuText as="p">로그아웃</HeaderMenuText>
                )}
              </HeaderMenuContainerButton>
            ) : (
              <GlobalLink href={'/login'} onClick={onClose}>
                {isLoading ? (
                  <AppHeaderMenuTextSkeleton />
                ) : (
                  <HeaderMenuText as="p">로그인</HeaderMenuText>
                )}
              </GlobalLink>
            )}
            <GlobalLink href={APP_STORE_URL} onClick={onClose} style={{ margin: '0 auto' }}>
              <Button theme="border">{APP_DOWNLOAD_WORDING}</Button>
            </GlobalLink>
          </ModalContent>
        </ModalPaper>
      )}
    </ModalContainer>
  );
};
