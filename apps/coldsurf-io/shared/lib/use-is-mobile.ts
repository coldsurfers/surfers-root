'use client';

import { breakpoints } from '@coldsurfers/ocean-road';
import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('resize', callback);
  };
};

const getSnapshot = () => window.innerWidth <= breakpoints.medium;
const getServerSnapshot = () => false; // SSR에서는 모바일로 판단하지 않음

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
