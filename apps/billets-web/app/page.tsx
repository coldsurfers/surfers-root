import { initialPageQuery } from '@/libs/openapi-client';
import { ApiErrorBoundaryRegistry } from '@/libs/registries';
import { getQueryClient } from '@/libs/utils/utils.query-client';
import { tryParse } from '@coldsurfers/shared-utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { PageLayout, PageTop } from './(ui)';
import { RouteLoading } from './(ui)/route-loading/route-loading';

export const dynamic = 'force-dynamic';

const slugs = [
  '롤링홀',
  '채널1969',
  '웨스트브릿지-라이브홀',
  '블루스퀘어',
  '푸르지오아트홀',
  '고양종합운동장',
  '아르코예술극장',
  '예술의전당',
].sort(() => Math.random() - 0.5);

async function PageInner() {
  const queryClient = getQueryClient();

  const dehydratedState = tryParse(JSON.stringify(dehydrate(queryClient)));

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout top={<PageTop />} slugs={slugs} />
    </HydrationBoundary>
  );
}

export default async function Home() {
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  );
}
