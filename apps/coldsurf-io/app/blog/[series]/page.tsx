import { SeriesListAll } from '../(components)';
import { PageLayout } from '../(components)/page-layout';
import { fetchGetSeries } from '../(fetchers)';
import type { SeriesCategory } from '../(types)/series';
import { convertSeriesCategoryToTitle } from '../(utils)';

export default async function SeriesPage(props: {
  params: Promise<{
    series: SeriesCategory;
  }>;
}) {
  const params = await props.params;
  const series = params.series as SeriesCategory;

  const { postItems, totalPage } = await fetchGetSeries({
    appLocale: 'ko',
    seriesCategory: series,
    tag: undefined,
  });

  return (
    <PageLayout title={convertSeriesCategoryToTitle(series)}>
      <SeriesListAll
        seriesCategory={series}
        postItems={postItems}
        totalPage={totalPage}
        currentPage={1}
      />
    </PageLayout>
  );
}
