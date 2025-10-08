import { generateLogListMetadata } from 'app/blog/(metadata)';
import { SeriesCategorySchema } from 'app/blog/(types)/series';
import { createBlogError } from 'app/blog/(utils)';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import { match } from 'ts-pattern';
import { fetchGetSeries } from '../../../(fetchers)';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams({
  params,
}: {
  params: Awaited<LayoutProps<'/blog/[series]/page/[page]'>['params']>;
}) {
  const seriesParams = await params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(seriesParams.series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: seriesParams.series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  const seriesCategory = seriesCategoryValidation.data;
  const { totalPage } = await fetchGetSeries({
    appLocale: 'ko',
    seriesCategory,
    tag: undefined,
  });
  return Array.from({ length: totalPage }, (_, index) => ({
    page: `${index + 1}`,
    series: seriesCategory,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: LayoutProps<'/blog/[series]/page/[page]'>['params'];
}): Promise<Metadata> {
  const layoutParams = await params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(layoutParams.series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: layoutParams.series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  const metaTitle = match(seriesCategoryValidation.data)
    .with('catholic', () => 'COLDSURF Blog: Article about Catholic')
    .with('sound', () => 'COLDSURF Blog: Article about music')
    .with('tech', () => 'COLDSURF Blog: Article about Software Development')
    .with('text', () => 'COLDSURF Blog: Article about Books & Texts')
    .with('video', () => 'COLDSURF Blog: Article about films and videos')
    .exhaustive();

  const metaDescription = match(seriesCategoryValidation.data)
    .with('catholic', () => 'Article about Catholic')
    .with('sound', () => 'Article about music')
    .with('tech', () => 'Article about Software Development')
    .with('text', () => 'Article about Books & Texts')
    .with('video', () => 'Article about films and videos')
    .exhaustive();

  return generateLogListMetadata({
    title: metaTitle,
    description: metaDescription,
    seriesCategory: seriesCategoryValidation.data,
  });
}

export default async function BlogArticleListByPageLayout({
  children,
  params,
}: { children: ReactNode; params: Promise<{ page: string; series: string }> }) {
  const seriesParams = (await params).series;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(seriesParams);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: seriesParams,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  return children;
}
