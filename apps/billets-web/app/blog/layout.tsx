import { getQueryClient } from '@/libs/utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { type ReactNode, Suspense } from 'react';
import { queryKeyFactory } from './(react-query)/react-query.key-factory';

export const revalidate = 3600;

export const dynamic = 'force-static';

export default async function BlogLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    ...queryKeyFactory.series.listAll('ko'),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </Suspense>
  );
}
