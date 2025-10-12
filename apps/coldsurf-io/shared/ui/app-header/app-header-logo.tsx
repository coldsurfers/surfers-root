'use client';

import { media } from '@coldsurfers/ocean-road';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Kaushan_Script } from 'next/font/google';
import { AppLogo } from '../app-logo';
import { GlobalLink } from '../global-link';
import { HeaderTitle } from './app-header.styled';

const StyledHeaderLogo = styled(AppLogo)`
  margin-right: 12px;

  width: 42px;
  height: 42px;

  ${media.large(css`
    width: 36px;
    height: 36px;
  `)}
`;

const kaushanScriptFont = Kaushan_Script({
  subsets: ['latin'],
  weight: ['400'],
});

export const AppHeaderLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      <GlobalLink href="/">
        <StyledHeaderLogo type="round" />
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
