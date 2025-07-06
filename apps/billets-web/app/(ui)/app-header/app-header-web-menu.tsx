'use client';

import { APP_DOWNLOAD_WORDING } from '@/libs/constants';
import { Button } from '@coldsurfers/ocean-road';
import { APP_STORE_URL } from '@coldsurfers/shared-utils';
import { useRouter } from 'next/navigation';
import type { MouseEventHandler } from 'react';
import { ColorSchemeToggle } from '../color-scheme-toggle';
import { GlobalLink } from '../global-link';
import { AppHeaderSearchUI } from './app-header.search-ui';
import {
  AppHeaderMenuTextSkeleton,
  HeaderMenuContainerButton,
  HeaderMenuContainerGlobalLink,
  HeaderMenuContainerLink,
  HeaderMenuText,
  WebMenuContainer,
} from './app-header.styled';
import { commonMenuItems } from './constants';

export const AppHeaderWebMenu = ({
  isLoggedIn,
  logout,
  isLoading,
}: {
  isLoggedIn: boolean;
  logout: () => void;
  isLoading: boolean;
}) => {
  const router = useRouter();
  return (
    <WebMenuContainer>
      {commonMenuItems.map((item) => {
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
      {isLoggedIn ? (
        <HeaderMenuContainerButton onClick={() => logout()}>
          {isLoading ? (
            <AppHeaderMenuTextSkeleton />
          ) : (
            <HeaderMenuText as="p">로그아웃</HeaderMenuText>
          )}
        </HeaderMenuContainerButton>
      ) : (
        <GlobalLink href={'/login'} style={{ paddingRight: 10 }}>
          {isLoading ? (
            <AppHeaderMenuTextSkeleton />
          ) : (
            <HeaderMenuText as="p">로그인</HeaderMenuText>
          )}
        </GlobalLink>
      )}
      <AppHeaderSearchUI />
      <GlobalLink href={APP_STORE_URL} target="_blank">
        <Button theme="border">{APP_DOWNLOAD_WORDING}</Button>
      </GlobalLink>
      <ColorSchemeToggle />
    </WebMenuContainer>
  );
};
