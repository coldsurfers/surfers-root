'use client';

import { getQueryClient } from '@/libs/utils/utils.query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export const QueryClientRegistry = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
