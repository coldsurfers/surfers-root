import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import { RouteLoading } from 'app/(ui)/route-loading';
import { fetchGetSeries } from 'app/blog/(fetchers)';
import type { SeriesCategory } from 'app/blog/(types)/series';
import { PageLayout } from '../../../(components)/page-layout';
import { SeriesListAll } from '../../../(components)/series-list-all';

export default async function BlogArticleListByPage({
  params,
}: {
  params: Promise<{
    page: string;
    series: SeriesCategory;
  }>;
}) {
  const { page, series } = await params;

  const { postItems, totalPage } = await fetchGetSeries({
    appLocale: 'ko',
    seriesCategory: series,
    tag: undefined,
  });
  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading deps={[page]}>
        <PageLayout>
          <SeriesListAll
            postItems={postItems}
            totalPage={totalPage}
            currentPage={Number(page)}
            seriesCategory={series}
          />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
