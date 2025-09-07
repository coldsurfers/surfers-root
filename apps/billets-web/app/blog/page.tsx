import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
import { RouteLoading } from 'app/(ui)';
import { PageLayout } from './(components)/page-layout';
import { SeriesListAll } from './(components)/series-list-all';
import { fetchGetSeriesListAllStatic } from './(fetchers)';

export default async function RootPage() {
  const { allPostItems, totalPage } = await fetchGetSeriesListAllStatic();

  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading>
        <PageLayout>
          <SeriesListAll allPostItems={allPostItems} totalPage={totalPage} currentPage={1} />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
