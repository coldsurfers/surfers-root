'use client';

import { apiClient } from '@/libs/openapi-client';
import { authUtils } from '@/libs/utils/utils.auth';
import { Spinner } from '@coldsurfers/ocean-road';
import { useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  accessToken: string;
  refreshToken: string;
};

export const CookieInject = (props: Props) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    authUtils.localLogin(props);
    queryClient.removeQueries({ queryKey: apiClient.user.queryKeys.me });
    redirect('/');
  }, [props, queryClient]);

  return <Spinner variant="page-overlay" />;
};
