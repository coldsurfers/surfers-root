import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import { RouteLoading } from 'app/(ui)/route-loading';
import { fetchGetSeriesListAllStatic } from 'app/blog/(fetchers)';
import { PageLayout } from '../../(components)/page-layout';
import { SeriesListAll } from '../../(components)/series-list-all';

export default async function BlogArticleListByPage({
  params,
}: {
  params: Promise<{
    page: string;
  }>;
}) {
  const { page } = await params;

  const { allPostItems, totalPage } = await fetchGetSeriesListAllStatic({ tag: undefined });
  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading deps={[page]}>
        <PageLayout>
          <SeriesListAll
            postItems={allPostItems}
            seriesCategory={null}
            totalPage={totalPage}
            currentPage={Number(page)}
          />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
