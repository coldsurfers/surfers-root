import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
import { RouteLoading } from 'app/(ui)';
import { cache } from 'react';
import { PageLayout } from './(components)/page-layout';
import { SeriesListAll } from './(components)/series-list-all';
import { ALL_SERIES_CATEGORIES } from './(constants)';
import { fetchGetSeries } from './(fetchers)';
import type { AppLocale } from './(types)/i18n';

const DEFAULT_APP_LOCALE: AppLocale = 'ko';

const getSeriesListAllStatic = cache(async () => {
  const promises = ALL_SERIES_CATEGORIES.map(async (seriesCategory) => {
    return await fetchGetSeries({
      seriesCategory,
      appLocale: DEFAULT_APP_LOCALE,
      tag: undefined,
    });
  });
  const response = await Promise.all(promises);
  return response;
});

export default async function RootPage(pageProps: { searchParams: Promise<{ page?: string }> }) {
  const pageParam = (await pageProps.searchParams).page ?? '1';
  const initialData = await getSeriesListAllStatic();

  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading deps={[pageParam]}>
        <PageLayout>
          <SeriesListAll initialData={initialData} page={Number(pageParam)} />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
