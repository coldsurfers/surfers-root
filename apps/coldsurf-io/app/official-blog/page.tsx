import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import { RouteLoading } from 'app/(ui)';
import { SeriesListAll } from 'app/blog/(components)';
import { PageLayout } from 'app/blog/(components)/page-layout';
import { fetchGetSeriesListAllStatic } from 'app/blog/(fetchers)';

export default async function OfficialBlogPage() {
  const { allPostItems, totalPage } = await fetchGetSeriesListAllStatic({
    tag: undefined,
    isOfficialBlog: true,
  });
  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading>
        <PageLayout isOfficialBlog>
          <SeriesListAll
            postItems={allPostItems}
            totalPage={totalPage}
            currentPage={1}
            seriesCategory={null}
            isOfficialBlog
          />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
