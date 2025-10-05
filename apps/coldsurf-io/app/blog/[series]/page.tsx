import { SeriesListAll } from '../(components)';
import { PageLayout } from '../(components)/page-layout';
import { fetchGetSeries } from '../(fetchers)';
import { SeriesCategorySchema } from '../(types)/series';
import { convertSeriesCategoryToTitle } from '../(utils)';

export default async function SeriesPage(props: {
  params: Promise<{
    series: string;
  }>;
}) {
  const params = await props.params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(params.series);
  if (!seriesCategoryValidation.success) {
    throw new Error('invalid series category');
  }
  const seriesCategory = seriesCategoryValidation.data;

  const { postItems, totalPage } = await fetchGetSeries({
    appLocale: 'ko',
    seriesCategory,
    tag: undefined,
  });

  return (
    <PageLayout title={convertSeriesCategoryToTitle(seriesCategory)}>
      <SeriesListAll
        seriesCategory={seriesCategory}
        postItems={postItems}
        totalPage={totalPage}
        currentPage={1}
      />
    </PageLayout>
  );
}
