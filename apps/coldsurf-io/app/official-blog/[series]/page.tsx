import { SeriesListAll } from 'app/blog/(components)';
import { PageLayout } from 'app/blog/(components)/page-layout';
import { fetchGetSeries } from 'app/blog/(fetchers)';
import { OfficialBlogSeriesCategorySchema } from 'app/blog/(types)/series';
import { convertSeriesCategoryToTitle, createBlogError } from 'app/blog/(utils)';

export default async function OfficialBlogSeriesPage(props: {
  params: Promise<{
    series: string;
  }>;
}) {
  const params = await props.params;
  const seriesCategoryValidation = OfficialBlogSeriesCategorySchema.safeParse(params.series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: params.series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  const seriesCategory = seriesCategoryValidation.data;

  const { postItems, totalPage } = await fetchGetSeries({
    appLocale: 'ko',
    seriesCategory,
    tag: undefined,
    isOfficialBlog: true,
  });
  return (
    <PageLayout title={convertSeriesCategoryToTitle(seriesCategory)} isOfficialBlog>
      <SeriesListAll
        seriesCategory={seriesCategory}
        postItems={postItems}
        totalPage={totalPage}
        currentPage={1}
        isOfficialBlog
      />
    </PageLayout>
  );
}
