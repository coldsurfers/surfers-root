'use client';

import { KeySquare as KeySquareIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { GlobalLink } from '../global-link';
import { HeaderMenuItem } from '../header-menu-item';
import { createStyledIcon } from './app-header.styled';

export const AppHeaderLoginMenu = ({
  onClickMobileLogout,
}: {
  onClickMobileLogout: () => void;
}) => {
  const pathname = usePathname();

  const LoginIcon = createStyledIcon(KeySquareIcon);

  return (
    <GlobalLink href={'/login'} onClick={onClickMobileLogout}>
      <HeaderMenuItem isCurrent={pathname.includes('/login')} icon={<LoginIcon />}>
        로그인
      </HeaderMenuItem>
    </GlobalLink>
  );
};
