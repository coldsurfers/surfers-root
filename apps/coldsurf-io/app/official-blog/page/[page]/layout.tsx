import { fetchGetSeriesListAllStatic } from 'app/blog/(fetchers)';
import type { ReactNode } from 'react';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const generateStaticParams = async () => {
  const { totalPage } = await fetchGetSeriesListAllStatic({ tag: undefined, isOfficialBlog: true });
  return Array.from({ length: totalPage }, (_, index) => ({
    page: `${index + 1}`,
  }));
};

export default function OfficialBlogArticleListByPageLayout({ children }: { children: ReactNode }) {
  return children;
}
