'use client';

import { APP_DOWNLOAD_WORDING } from '@/libs/constants';
import { useIsLoggedIn } from '@/shared/lib';
import { Button } from '@coldsurfers/ocean-road';
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
  HeaderMenuContainerGlobalLink,
  HeaderMenuContainerLink,
  WebMenuContainer,
  createStyledIcon,
} from './app-header.styled';

export const AppHeaderWebMenu = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoggedIn } = useIsLoggedIn();

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
        const Icon = createStyledIcon(item.icon);
        return (
          <Container key={item.link} href={item.link} onClick={onClick} target={item.target}>
            <HeaderMenuItem
              isCurrent={
                pathname.includes(item.link) ||
                item.subPaths.some((subPath) => pathname.includes(subPath))
              }
              icon={<Icon />}
            >
              {item.title}
            </HeaderMenuItem>
          </Container>
        );
      })}
      {!isLoggedIn && <AppHeaderLoginMenu onClickMobileLogout={onClose} />}
      <AppHeaderMyPageMenu onClick={onClose} />
      <AppHeaderSearchUI />
      <GlobalLink href={APP_STORE_URL} target="_blank">
        <Button theme="border">{APP_DOWNLOAD_WORDING}</Button>
      </GlobalLink>
      <ColorSchemeToggle />
    </WebMenuContainer>
  );
};
