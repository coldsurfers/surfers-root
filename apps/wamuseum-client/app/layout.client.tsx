'use client';

import { ApolloHydrationBoundary, ApolloProviderRegistry } from '@/libs';
import { Header } from '@/ui';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export const RootLayoutClient = ({
  children,
  initialState,
}: PropsWithChildren<{
  initialState?: object;
  token?: string;
}>) => {
  const pathname = usePathname();
  return (
    <ApolloProviderRegistry>
      <ApolloHydrationBoundary initialState={initialState}>
        {pathname?.includes('/auth') ? null : <Header />}
        {children}
      </ApolloHydrationBoundary>
    </ApolloProviderRegistry>
  );
};
