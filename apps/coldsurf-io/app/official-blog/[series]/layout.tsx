import { ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG } from 'app/blog/(constants)';
import { OfficialBlogSeriesCategorySchema } from 'app/blog/(types)/series';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

export const revalidate = 3600;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG.map((series) => {
    return {
      series,
    };
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
