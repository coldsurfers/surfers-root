'use client';

import { Button, colors } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useAuthStore } from '../../../libs/stores/auth-store/auth-store';

const SocialLoginButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
  background-color: ${colors.oc.white.value};

  span {
    color: ${colors.oc.black.value} !important;
  }
`;

export const GoogleLoginButton = () => {
  const setAfterLoginRedirect = useAuthStore((state) => state.setAfterLoginRedirect);

  return (
    <Link href={'/api/auth/google'} style={{ width: '100%' }}>
      <SocialLoginButton type="button">구글로 계속하기</SocialLoginButton>
    </Link>
  );
};
