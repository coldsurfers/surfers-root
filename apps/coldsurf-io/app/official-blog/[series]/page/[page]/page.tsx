import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import { RouteLoading } from 'app/(ui)/route-loading';
import { PageLayout } from 'app/blog/(components)/page-layout';
import { SeriesListAll } from 'app/blog/(components)/series-list-all';
import { fetchGetSeries } from 'app/blog/(fetchers)';
import { OfficialBlogSeriesCategorySchema } from 'app/blog/(types)/series';
import { createBlogError } from 'app/blog/(utils)';

export default async function BlogArticleListByPage({
  params,
}: {
  params: Promise<{
    page: string;
    series: string;
  }>;
}) {
  const { page, series } = await params;
  const seriesCategoryValidation = OfficialBlogSeriesCategorySchema.safeParse(series);
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
    isOfficialBlog: true,
  });
  return (
    <GlobalErrorBoundaryRegistry>
      <RouteLoading deps={[page]}>
        <PageLayout isOfficialBlog>
          <SeriesListAll
            postItems={postItems}
            totalPage={totalPage}
            currentPage={Number(page)}
            seriesCategory={seriesCategoryValidation.data}
            isOfficialBlog
          />
        </PageLayout>
      </RouteLoading>
    </GlobalErrorBoundaryRegistry>
  );
}
