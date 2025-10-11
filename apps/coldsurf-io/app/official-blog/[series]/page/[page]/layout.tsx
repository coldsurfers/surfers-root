import { fetchGetSeries } from 'app/blog/(fetchers)';
import { generateLogListMetadata } from 'app/blog/(metadata)';
import { OfficialBlogSeriesCategorySchema } from 'app/blog/(types)/series';
import { createBlogError } from 'app/blog/(utils)';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import { match } from 'ts-pattern';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams({
  params,
}: {
  params: Awaited<LayoutProps<'/official-blog/[series]/page/[page]'>['params']>;
}) {
  const seriesParams = await params;
  const seriesCategoryValidation = OfficialBlogSeriesCategorySchema.safeParse(seriesParams.series);
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
    isOfficialBlog: true,
  });
  return Array.from({ length: totalPage }, (_, index) => ({
    page: `${index + 1}`,
    series: seriesCategory,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: LayoutProps<'/official-blog/[series]/page/[page]'>['params'];
}): Promise<Metadata> {
  const layoutParams = await params;
  const seriesCategoryValidation = OfficialBlogSeriesCategorySchema.safeParse(layoutParams.series);
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
    .with('news', () => 'COLDSURF Blog: NEWS')
    .exhaustive();

  const metaDescription = match(seriesCategoryValidation.data)
    .with('news', () => 'Article about news')
    .exhaustive();

  return generateLogListMetadata({
    title: metaTitle,
    description: metaDescription,
    seriesCategory: seriesCategoryValidation.data,
  });
}

export default async function OfficialBlogArticleListByPageLayout({
  children,
  params,
}: { children: ReactNode; params: Promise<{ page: string; series: string }> }) {
  const seriesParams = (await params).series;
  const seriesCategoryValidation = OfficialBlogSeriesCategorySchema.safeParse(seriesParams);
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
