import type { ReactNode } from 'react';
import { fetchGetSeriesListAllStatic } from '../../(fetchers)';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const generateStaticParams = async () => {
  const { totalPage } = await fetchGetSeriesListAllStatic({ tag: undefined });
  return Array.from({ length: totalPage }, (_, index) => ({
    page: `${index + 1}`,
  }));
};

export default function BlogArticleListByPageLayout({ children }: { children: ReactNode }) {
  return children;
}
