import { ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG } from 'app/blog/(constants)';
import { generateLogListMetadata } from 'app/blog/(metadata)';
import { OfficialBlogSeriesCategorySchema } from 'app/blog/(types)/series';
import { createBlogError } from 'app/blog/(utils)';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import { match } from 'ts-pattern';

export const revalidate = 3600;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG.map((series) => {
    return {
      series,
    };
  });
}

export async function generateMetadata(props: {
  params: LayoutProps<'/official-blog/[series]'>['params'];
}): Promise<Metadata> {
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
  const metaTitle = match(seriesCategoryValidation.data)
    .with('news', () => 'COLDSURF Blog: NEWS')
    .with('culture', () => 'COLDSURF Blog: CULTURE')
    .exhaustive();

  const metaDescription = match(seriesCategoryValidation.data)
    .with('news', () => 'Article about news')
    .with('culture', () => 'Article about culture')
    .exhaustive();

  return generateLogListMetadata({
    title: metaTitle,
    description: metaDescription,
    seriesCategory: seriesCategoryValidation.data,
  });
}

export default async function OfficialBlogSeriesLayout(props: {
  children: ReactNode;
  params: Promise<{
    series: string;
  }>;
}) {
  const params = await props.params;

  const { children } = props;

  const seriesCategoryValidation = OfficialBlogSeriesCategorySchema.safeParse(params.series);
  if (!seriesCategoryValidation.success) {
    redirect('/official-blog');
  }
  return <>{children}</>;
}
