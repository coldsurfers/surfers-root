'use client';

import { APP_DOWNLOAD_WORDING } from '@/libs/constants';
import { Button, IconButton, Text } from '@coldsurfers/ocean-road';
import { APP_STORE_URL } from '@coldsurfers/shared-utils';
import { ColorSchemeToggle } from 'app/(ui)';
import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useEffect } from 'react';
import { GlobalLink } from '../global-link';
import { AppHeaderLoginMenu } from './app-header-login-menu';
import { AppHeaderSearchUI } from './app-header.search-ui';
import {
  AppHeaderMenuTextSkeleton,
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
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
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
            <AppHeaderLoginMenu onClickMobileLogout={onClose} />
            <GlobalLink href={APP_STORE_URL} onClick={onClose} style={{ margin: '0 auto' }}>
              <Button theme="border">{APP_DOWNLOAD_WORDING}</Button>
            </GlobalLink>
            <ColorSchemeToggle />
          </ModalContent>
        </ModalPaper>
      )}
    </ModalContainer>
  );
};
