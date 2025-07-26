'use client';

import { useLinkStore } from '@/features';
import { Spinner } from '@coldsurfers/ocean-road';
import { type PropsWithChildren, Suspense, useLayoutEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export function RouteLoading({ children }: PropsWithChildren) {
  const { setIsLoading, isLoading } = useLinkStore(
    useShallow((state) => ({ setIsLoading: state.setIsLoading, isLoading: state.isLoading }))
  );

  useLayoutEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <Suspense fallback={<Spinner variant="page-overlay" />}>
      {children}
      {isLoading && <Spinner variant="page-overlay" />}
    </Suspense>
  );
}
