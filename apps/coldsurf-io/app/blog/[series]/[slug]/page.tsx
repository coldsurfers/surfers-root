import { Suspense, cache } from 'react';

import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
import type { FetchGetSeriesItemSearchParams } from 'app/api/blog/series/[slug]/types';
import { fetchGetSeriesItem } from 'app/blog/(fetchers)';
import { LogDetailRenderer } from 'app/blog/(notion-render)/log-detail-renderer';
import { SeriesCategorySchema } from 'app/blog/(types)/series';
import { createBlogError } from 'app/blog/(utils)';

const getSeriesItemStatic = cache(
  async (slug: string, searchParams: FetchGetSeriesItemSearchParams) => {
    const response = await fetchGetSeriesItem(slug, searchParams);
    return response;
  }
);

export default async function SeriesSlugPage(props: {
  params: Promise<{
    slug: string;
    series: string;
  }>;
}) {
  const params = await props.params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(params.series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError({
      type: 'invalid-series-category',
      seriesCategory: params.series,
    });
  }
  const initialData = await getSeriesItemStatic(params.slug, {
    seriesCategory: seriesCategoryValidation.data,
    appLocale: 'ko',
  });

  return (
    <GlobalErrorBoundaryRegistry>
      <Suspense>
        <LogDetailRenderer
          slug={params.slug}
          seriesCategory={seriesCategoryValidation.data}
          initialData={initialData}
        />
      </Suspense>
    </GlobalErrorBoundaryRegistry>
  );
}
