'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { PageLayout } from '../(components)/page-layout';
import type { SeriesCategory } from '../(types)/series';
import { convertSeriesCategoryToTitle } from '../(utils)';
import { SeriesListItems } from './(component)/series-list-items';

export default function SeriesPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const series = params.series as SeriesCategory;

  return (
    <PageLayout title={convertSeriesCategoryToTitle(series)}>
      <SeriesListItems seriesCategory={series} page={page} />
    </PageLayout>
  );
}
