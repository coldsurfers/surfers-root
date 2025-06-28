'use client';
import { Suspense, use } from 'react';

import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
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
      <Suspense>
        <LogDetailRenderer slug={params.slug} locale={'ko'} seriesCategory={params.series} />
      </Suspense>
    </GlobalErrorBoundaryRegistry>
  );
}
