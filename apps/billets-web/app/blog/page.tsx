import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
import { getQueryClient } from '@/libs/utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { RouteLoading } from 'app/(ui)';
import { PageLayout } from './(components)/page-layout';
import { SeriesListAll } from './(components)/series-list-all';
import { queryKeyFactory } from './(react-query)/react-query.key-factory';
import type { AppLocale } from './(types)/i18n';

const DEFAULT_APP_LOCALE: AppLocale = 'ko';

export default async function RootPage(pageProps: { searchParams: Promise<{ page?: string }> }) {
  const pageParam = (await pageProps.searchParams).page ?? '1';

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    ...queryKeyFactory.series.listAll(DEFAULT_APP_LOCALE),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading deps={[pageParam]}>
        <HydrationBoundary state={dehydratedState}>
          <PageLayout>
            <SeriesListAll page={Number(pageParam)} />
          </PageLayout>
        </HydrationBoundary>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
