import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import type { FetchGetSeriesItemSearchParams } from 'app/api/blog/series/[slug]/types';
import { fetchGetSeriesItem } from 'app/blog/(fetchers)';
import { LogDetailRenderer } from 'app/blog/(notion-render)/log-detail-renderer';
import { OfficialBlogSeriesCategorySchema, SeriesCategorySchema } from 'app/blog/(types)/series';
import { createBlogError } from 'app/blog/(utils)';
import { Suspense, cache } from 'react';

const getSeriesItemStatic = cache(
  async (slug: string, searchParams: FetchGetSeriesItemSearchParams) => {
    const response = await fetchGetSeriesItem(slug, searchParams);
    return response;
  }
);

export default async function OfficialBlogSeriesSlugPage(props: {
  params: Promise<{
    slug: string;
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
  const initialData = await getSeriesItemStatic(params.slug, {
    seriesCategory: seriesCategoryValidation.data,
    appLocale: 'ko',
    isOfficialBlog: true,
  });

  return (
    <GlobalErrorBoundaryRegistry>
      <Suspense>
        <LogDetailRenderer
          slug={params.slug}
          seriesCategory={seriesCategoryValidation.data}
          initialData={initialData}
          isOfficialBlog
        />
      </Suspense>
    </GlobalErrorBoundaryRegistry>
  );
}
