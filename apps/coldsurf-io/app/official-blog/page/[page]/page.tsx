import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import { RouteLoading } from 'app/(ui)/route-loading';
import { PageLayout } from 'app/blog/(components)/page-layout';
import { SeriesListAll } from 'app/blog/(components)/series-list-all';
import { fetchGetSeriesListAllStatic } from 'app/blog/(fetchers)';

export default async function OfficialBlogArticleListByPage({
  params,
}: {
  params: Promise<{
    page: string;
  }>;
}) {
  const { page } = await params;

  const { allPostItems, totalPage } = await fetchGetSeriesListAllStatic({
    tag: undefined,
    isOfficialBlog: true,
  });
  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading deps={[page]}>
        <PageLayout>
          <SeriesListAll
            postItems={allPostItems}
            seriesCategory={null}
            totalPage={totalPage}
            currentPage={Number(page)}
            isOfficialBlog
          />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
