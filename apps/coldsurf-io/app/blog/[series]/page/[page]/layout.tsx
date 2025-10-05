import { SeriesCategorySchema } from 'app/blog/(types)/series';
import type { ReactNode } from 'react';
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
    throw new Error('invalid series category');
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

export default async function BlogArticleListByPageLayout({
  children,
  params,
}: { children: ReactNode; params: Promise<{ page: string; series: string }> }) {
  const seriesParams = (await params).series;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(seriesParams);
  if (!seriesCategoryValidation.success) {
    throw new Error('invalid series category');
  }
  return children;
}
