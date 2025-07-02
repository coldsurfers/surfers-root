'use client';

import { authUtils } from '@/libs/utils/utils.auth';
import { Spinner } from '@coldsurfers/ocean-road';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  accessToken: string;
  refreshToken: string;
};

export const CookieInject = (props: Props) => {
  useEffect(() => {
    authUtils.localLogin(props);
    redirect('/');
  }, [props]);

  return <Spinner variant="page-overlay" />;
};
