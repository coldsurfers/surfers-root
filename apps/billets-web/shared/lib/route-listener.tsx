'use client';

import storage from '@/libs/utils/utils.storage';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const RouteListener = () => {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const themeValue = storage?.get<string>('@coldsurf-io/theme');
    if (themeValue === 'dark' && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
  }, [pathname]);

  return null;
};
