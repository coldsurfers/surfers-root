import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
import { RouteLoading } from 'app/(ui)';
import { PageLayout } from './(components)/page-layout';
import { SeriesListAll } from './(components)/series-list-all';
import { fetchGetSeriesListAllStatic } from './(fetchers)';

export default async function RootPage() {
  const { allPostItems, totalPage } = await fetchGetSeriesListAllStatic({ tag: undefined });

  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading>
        <PageLayout>
          <SeriesListAll
            postItems={allPostItems}
            totalPage={totalPage}
            currentPage={1}
            seriesCategory={null}
            isOfficialBlog={false}
          />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
