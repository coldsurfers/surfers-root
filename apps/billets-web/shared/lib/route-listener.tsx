'use client';

import { appSessionStorage } from '@/libs/utils';
import storage from '@/libs/utils/utils.storage';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { pagePathnames } from '../constants';

const pathnamesToPrevent = [pagePathnames.socialRedirect];

export const RouteListener = () => {
  const pathname = usePathname();

  const restoreThemeCsr = useCallback(() => {
    const themeValue = storage?.get<string>('@coldsurf-io/theme');
    if (themeValue === 'dark' && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const setPathInfoSessionStorage = useCallback(() => {
    if (pathnamesToPrevent.includes(pathname)) {
      return;
    }
    const currentPath = appSessionStorage?.get<string>('@coldsurf-io/current-path');
    appSessionStorage?.set('@coldsurf-io/prev-path', currentPath || '');
    appSessionStorage?.set('@coldsurf-io/current-path', pathname);
  }, [pathname]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    restoreThemeCsr();
    setPathInfoSessionStorage();
  }, [pathname, restoreThemeCsr, setPathInfoSessionStorage]);

  return null;
};
