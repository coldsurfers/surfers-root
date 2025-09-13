'use client';

import { APP_DOWNLOAD_WORDING } from '@/libs/constants';
import { Button } from '@coldsurfers/ocean-road';
import { APP_STORE_URL } from '@coldsurfers/shared-utils';
import { ColorSchemeToggle } from 'app/(ui)';
import { useRouter } from 'next/navigation';
import type { MouseEventHandler } from 'react';
import { HEADER_MENU_ITEMS } from '../constants';
import { GlobalLink } from '../global-link';
import { HeaderMenuItem } from '../header-menu-item';
import { AppHeaderLoginMenu } from './app-header-login-menu';
import { AppHeaderMyPageMenu } from './app-header-my-page-menu';
import { AppHeaderSearchUI } from './app-header.search-ui';
import {
  HeaderMenuContainerGlobalLink,
  HeaderMenuContainerLink,
  WebMenuContainer,
} from './app-header.styled';

export const AppHeaderWebMenu = ({
  isLoading,
  onClose,
}: {
  isLoading: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  return (
    <WebMenuContainer>
      {HEADER_MENU_ITEMS.filter((value) => value.visible).map((item) => {
        const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
          if (item.link === '/browse') {
            e.preventDefault();
            router.push('/browse/seoul');
          }
        };
        const Container =
          item.link === '/browse' ? HeaderMenuContainerLink : HeaderMenuContainerGlobalLink;
        return (
          <Container key={item.link} href={item.link} onClick={onClick} target={item.target}>
            <HeaderMenuItem isLoading={isLoading} title={item.title} />
          </Container>
        );
      })}
      <AppHeaderMyPageMenu onClick={onClose} />
      <AppHeaderLoginMenu onClickMobileLogout={onClose} />
      <AppHeaderSearchUI />
      <GlobalLink href={APP_STORE_URL} target="_blank">
        <Button theme="border">{APP_DOWNLOAD_WORDING}</Button>
      </GlobalLink>
      <ColorSchemeToggle />
    </WebMenuContainer>
  );
};
