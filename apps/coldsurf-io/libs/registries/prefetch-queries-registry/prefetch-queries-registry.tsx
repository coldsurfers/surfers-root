import { apiClient } from '@/libs/openapi-client';
import { getQueryClient } from '@/libs/utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export const PrefetchQueriesRegistry = async ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: async () => {
      try {
        const response = await apiClient.user.getMe();
        return response;
      } catch (e) {
        console.error('server error', e);
        // do not return undefined, for fill the prefetched valid data
        // maybe most of errors would be 401 Unauthorized
        return null;
      }
    },
  });

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
