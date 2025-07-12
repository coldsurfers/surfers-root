'use client';

import { apiClient } from '@/libs/openapi-client';
import { authUtils } from '@/libs/utils/utils.auth';
import storage from '@/libs/utils/utils.storage';
import { themeUtils } from '@/libs/utils/utils.theme';
import { useSessionStorage } from '@/shared/lib';
import { type ColorScheme, Spinner } from '@coldsurfers/ocean-road';
import { useQueryClient } from '@tanstack/react-query';
import { redirect, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const CookieInject = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const sessionStorage = useSessionStorage();
  const prevPathname = sessionStorage.getValue<string>('@coldsurf-io/prev-path');

  const restoreColorScheme = useCallback(async () => {
    const themeStorageValue = storage?.get<'dark' | 'light'>('@coldsurf-io/theme');
    const nextTheme: ColorScheme = themeStorageValue ?? 'light';
    await themeUtils.setLocalTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
  }, []);

  useEffect(() => {
    async function processAuth() {
      if (!accessToken || !refreshToken) {
        return;
      }
      await authUtils.localLogin({
        accessToken,
        refreshToken,
      });
      await queryClient.prefetchQuery({
        queryKey: apiClient.user.queryKeys.me,
        queryFn: () => apiClient.user.getMe(),
      });
    }

    processAuth()
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        restoreColorScheme();
        redirect(prevPathname ?? '/');
      });
  }, [queryClient, accessToken, refreshToken, restoreColorScheme, prevPathname]);

  return <Spinner variant="page-overlay" />;
};
