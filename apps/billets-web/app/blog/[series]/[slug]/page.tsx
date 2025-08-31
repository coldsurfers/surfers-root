'use client';
import { Suspense, use } from 'react';

import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
import { Spinner } from '@coldsurfers/ocean-road';
import { LogDetailRenderer } from 'app/blog/(notion-render)/log-detail-renderer';
import type { SeriesCategory } from 'app/blog/(types)/series';

export default function SeriesSlugPage(props: {
  params: Promise<{
    slug: string;
    series: SeriesCategory;
  }>;
}) {
  const params = use(props.params);

  return (
    <GlobalErrorBoundaryRegistry>
      <Suspense fallback={<Spinner variant="page-overlay" />}>
        <LogDetailRenderer slug={params.slug} seriesCategory={params.series} />
      </Suspense>
    </GlobalErrorBoundaryRegistry>
  );
}
