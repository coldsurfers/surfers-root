import type { SeriesCategory } from 'app/blog/(types)/series';
import type { ReactNode } from 'react';
import { fetchGetSeries } from '../../../(fetchers)';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const generateStaticParams = async ({
  params,
}: {
  params: Promise<{
    series: SeriesCategory;
  }>;
}) => {
  const seriesCategory = (await params).series;
  const { totalPage } = await fetchGetSeries({
    appLocale: 'ko',
    seriesCategory,
    tag: undefined,
  });
  return Array.from({ length: totalPage }, (_, index) => ({
    page: `${index + 1}`,
    series: seriesCategory,
  }));
};

export default function BlogArticleListByPageLayout({ children }: { children: ReactNode }) {
  return children;
}
