'use client';

import { APP_DOWNLOAD_WORDING } from '@/libs/constants';
import { Button } from '@coldsurfers/ocean-road';
import { APP_STORE_URL } from '@coldsurfers/shared-utils';
import { ColorSchemeToggle } from 'app/(ui)';
import { useRouter } from 'next/navigation';
import type { MouseEventHandler } from 'react';
import { HEADER_MENU_ITEMS } from '../constants';
import { GlobalLink } from '../global-link';
import { AppHeaderLoginMenu } from './app-header-login-menu';
import { AppHeaderSearchUI } from './app-header.search-ui';
import {
  AppHeaderMenuTextSkeleton,
  HeaderMenuContainerGlobalLink,
  HeaderMenuContainerLink,
  HeaderMenuText,
  WebMenuContainer,
} from './app-header.styled';

export const AppHeaderWebMenu = ({
  isLoading,
  onClickMobileLogout,
}: {
  isLoading: boolean;
  onClickMobileLogout: () => void;
}) => {
  const router = useRouter();

  return (
    <WebMenuContainer>
      {HEADER_MENU_ITEMS.map((item) => {
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
            {isLoading ? (
              <AppHeaderMenuTextSkeleton />
            ) : (
              <HeaderMenuText as="p">{item.title}</HeaderMenuText>
            )}
          </Container>
        );
      })}
      <AppHeaderLoginMenu onClickMobileLogout={onClickMobileLogout} />
      <AppHeaderSearchUI />
      <GlobalLink href={APP_STORE_URL} target="_blank">
        <Button theme="border">{APP_DOWNLOAD_WORDING}</Button>
      </GlobalLink>
      <ColorSchemeToggle />
    </WebMenuContainer>
  );
};
