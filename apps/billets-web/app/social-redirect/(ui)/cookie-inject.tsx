'use client';

import { apiClient } from '@/libs/openapi-client';
import { authUtils } from '@/libs/utils/utils.auth';
import storage from '@/libs/utils/utils.storage';
import { themeUtils } from '@/libs/utils/utils.theme';
import { type ColorScheme, Spinner } from '@coldsurfers/ocean-road';
import { useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type Props = {
  accessToken: string;
  refreshToken: string;
};

export const CookieInject = (props: Props) => {
  const queryClient = useQueryClient();

  const restoreColorScheme = useCallback(async () => {
    const themeStorageValue = storage?.get<'dark' | 'light'>('@coldsurf-io/theme');
    const nextTheme: ColorScheme = themeStorageValue ?? 'light';
    await themeUtils.setLocalTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
  }, []);

  useEffect(() => {
    authUtils.localLogin(props);
    queryClient.removeQueries({ queryKey: apiClient.user.queryKeys.me });
    restoreColorScheme();
    redirect('/');
  }, [props, queryClient, restoreColorScheme]);

  return <Spinner variant="page-overlay" />;
};
