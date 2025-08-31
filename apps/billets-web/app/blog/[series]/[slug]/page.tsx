import { Suspense, use } from 'react';

import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
import type { FetchGetSeriesItemSearchParams } from 'app/api/blog/series/[slug]/types';
import { fetchGetSeriesItem } from 'app/blog/(fetchers)';
import { LogDetailRenderer } from 'app/blog/(notion-render)/log-detail-renderer';
import type { SeriesCategory } from 'app/blog/(types)/series';

async function getSeriesItemStatic(slug: string, searchParams: FetchGetSeriesItemSearchParams) {
  const response = await fetchGetSeriesItem(slug, searchParams);
  return response;
}

export default async function SeriesSlugPage(props: {
  params: Promise<{
    slug: string;
    series: SeriesCategory;
  }>;
}) {
  const params = await props.params;
  const initialData = await getSeriesItemStatic(params.slug, {
    seriesCategory: params.series,
    appLocale: 'ko',
  });

  return (
    <GlobalErrorBoundaryRegistry>
      <Suspense>
        <LogDetailRenderer
          slug={params.slug}
          seriesCategory={params.series}
          initialData={initialData}
        />
      </Suspense>
    </GlobalErrorBoundaryRegistry>
  );
}
