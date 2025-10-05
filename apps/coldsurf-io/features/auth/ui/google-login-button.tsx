'use client';

import { appSessionStorage } from '@/libs/utils';
import { Button, colors } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useCallback } from 'react';

const SocialLoginButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
  background-color: ${colors.oc.white.value};

  span {
    color: ${colors.oc.black.value} !important;
  }
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
      <SocialLoginButton type="button">구글로 계속하기</SocialLoginButton>
    </Link>
  );
};
