'use client';

import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { Kaushan_Script } from 'next/font/google';
import { GlobalLink } from '../global-link';
import { HeaderLogo, HeaderTitle } from './app-header.styled';

const kaushanScriptFont = Kaushan_Script({
  subsets: ['latin'],
  weight: ['400'],
});

export const AppHeaderLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      <GlobalLink href="/">
        <HeaderLogo src="/logo.png" alt="header_logo" />
      </GlobalLink>
      <GlobalLink href="/">
        <HeaderTitle as="h1">
          {SERVICE_NAME}{' '}
          <span style={{ fontSize: 12 }} className={kaushanScriptFont.className}>
            BETA
          </span>
        </HeaderTitle>
      </GlobalLink>
    </div>
  );
};
