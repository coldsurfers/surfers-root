'use client';

import storage from '@/libs/utils/utils.storage';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { pagePathnames } from '../constants';
import { useSessionStorage } from './use-session-storage';

const pathnamesToPrevent = [pagePathnames.socialRedirect];

export const RouteListener = () => {
  const pathname = usePathname();
  const sessionStorage = useSessionStorage();

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
    const currentPath = sessionStorage.getValue<string>('@coldsurf-io/current-path');
    sessionStorage.setValue('@coldsurf-io/prev-path', currentPath || '');
    sessionStorage.setValue('@coldsurf-io/current-path', pathname);
  }, [pathname, sessionStorage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    restoreThemeCsr();
    setPathInfoSessionStorage();
  }, [pathname, restoreThemeCsr, setPathInfoSessionStorage]);

  return null;
};
