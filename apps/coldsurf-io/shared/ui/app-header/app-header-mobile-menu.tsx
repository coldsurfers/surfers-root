'use client';

import { APP_DOWNLOAD_WORDING } from '@/libs/constants';
import { useIsLoggedIn, usePreventScrollEffect } from '@/shared/lib';
import { Button, IconButton } from '@coldsurfers/ocean-road';
import { APP_STORE_URL } from '@coldsurfers/shared-utils';
import { ColorSchemeToggle } from 'app/(ui)';
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEventHandler } from 'react';
import { HEADER_MENU_ITEMS } from '../constants';
import { GlobalLink } from '../global-link';
import { HeaderMenuItem } from '../header-menu-item';
import { AppHeaderLoginMenu } from './app-header-login-menu';
import { AppHeaderMyPageMenu } from './app-header-my-page-menu';
import { AppHeaderSearchUI } from './app-header.search-ui';
import {
  MobileMenuContainer,
  MobileMenuIcon,
  ModalContainer,
  ModalContent,
  ModalPaper,
  createStyledIcon,
} from './app-header.styled';

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
  const pathname = usePathname();
  const { isLoggedIn } = useIsLoggedIn();

  usePreventScrollEffect({
    shouldPrevent: isOpen,
  });

  return (
    <ModalContainer onClick={onClose} $isOpen={isOpen} style={{ overflowY: 'auto' }}>
      {isOpen && (
        <ModalPaper onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            {HEADER_MENU_ITEMS.filter((item) => item.visible).map((item) => {
              const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
                onClose();
                if (item.link === '/browse') {
                  e.preventDefault();
                  router.push('/browse/seoul');
                }
              };
              const Icon = createStyledIcon(item.icon);
              return (
                <GlobalLink key={item.link} href={item.link} target={item.target} onClick={onClick}>
                  <HeaderMenuItem
                    isLoading={isLoading}
                    isCurrent={pathname.includes(item.link)}
                    icon={<Icon />}
                  >
                    {item.title}
                  </HeaderMenuItem>
                </GlobalLink>
              );
            })}
            {!isLoggedIn && <AppHeaderLoginMenu onClickMobileLogout={onClose} />}
            <AppHeaderMyPageMenu onClick={onClose} />
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
