'use client';

import { appSessionStorage } from '@/libs/utils';
import { BrandIcon } from '@/shared/ui/brand-icon';
import { Button, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useCallback } from 'react';

const SocialLoginButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
  background-color: ${semantics.color.background[5]};

  color: ${semantics.color.foreground[1]} !important;
  font-size: 16px;

  ${media.small(css`
    font-size: 14px;
  `)}
`;

const StyledGoogleIcon = styled(BrandIcon)`
  width: 16px;
  height: 16px;
  fill: ${semantics.color.foreground[1]};
  margin-right: 0.5rem;
`;

interface Props {
  isFromLoginPage?: boolean;
}

export const GoogleLoginButton = ({ isFromLoginPage = false }: Props) => {
  const onClick = useCallback(() => {
    if (isFromLoginPage) {
      const prevPath = appSessionStorage?.get<string>('@coldsurf-io/prev-path');
      appSessionStorage?.set('@coldsurf-io/auth-redirect-path', prevPath || '/');
      return;
    }
    const currentPath = appSessionStorage?.get<string>('@coldsurf-io/current-path');
    appSessionStorage?.set('@coldsurf-io/auth-redirect-path', currentPath || '/');
  }, [isFromLoginPage]);

  return (
    <Link href={'/api/auth/google'} onClick={onClick} style={{ width: '100%' }}>
      <SocialLoginButton type="button" theme="border">
        <StyledGoogleIcon brand="google" />
        구글로 계속하기
      </SocialLoginButton>
    </Link>
  );
};
