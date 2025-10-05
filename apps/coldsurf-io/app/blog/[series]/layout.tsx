import { COMMON_META_DESCRIPTION, COMMON_META_TITLE } from '@/libs/constants';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import { match } from 'ts-pattern';
import { ALL_SERIES_CATEGORIES } from '../(constants)';
import { generateLogListMetadata } from '../(metadata)';
import { SeriesCategorySchema } from '../(types)/series';

export const revalidate = 3600;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return ALL_SERIES_CATEGORIES.map((series) => {
    return {
      series,
    };
  });
}

export async function generateMetadata(props: {
  params: LayoutProps<'/blog/[series]'>['params'];
}): Promise<Metadata> {
  try {
    const params = await props.params;
    const seriesCategoryValidation = SeriesCategorySchema.safeParse(params.series);
    if (!seriesCategoryValidation.success) {
      throw new Error('invalid series category');
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
  } catch {
    return generateLogListMetadata({
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
    });
  }
}

export default async function SeriesPageLayout(props: {
  children: ReactNode;
  params: Promise<{
    series: string;
  }>;
}) {
  const params = await props.params;

  const { children } = props;

  const seriesCategoryValidation = SeriesCategorySchema.safeParse(params.series);
  if (!seriesCategoryValidation.success) {
    redirect('/blog');
  }

  return <>{children}</>;
}
