import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import { RouteLoading } from 'app/(ui)/route-loading';
import { fetchGetSeries } from 'app/blog/(fetchers)';
import { SeriesCategorySchema } from 'app/blog/(types)/series';
import { createBlogError } from 'app/blog/(utils)';
import { PageLayout } from '../../../(components)/page-layout';
import { SeriesListAll } from '../../../(components)/series-list-all';

export default async function BlogArticleListByPage({
  params,
}: {
  params: Promise<{
    page: string;
    series: string;
  }>;
}) {
  const { page, series } = await params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  const { postItems, totalPage } = await fetchGetSeries({
    appLocale: 'ko',
    seriesCategory: seriesCategoryValidation.data,
    tag: undefined,
    isOfficialBlog: false,
  });
  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading deps={[page]}>
        <PageLayout>
          <SeriesListAll
            postItems={postItems}
            totalPage={totalPage}
            currentPage={Number(page)}
            seriesCategory={seriesCategoryValidation.data}
            isOfficialBlog={false}
          />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
