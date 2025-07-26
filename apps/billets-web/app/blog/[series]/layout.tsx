import { COMMON_META_DESCRIPTION, COMMON_META_TITLE } from '@/libs/constants';
import { getQueryClient } from '@/libs/utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import { match } from 'ts-pattern';
import { ALL_SERIES_CATEGORIES } from '../(constants)';
import { generateLogListMetadata } from '../(metadata)';
import { queryKeyFactory } from '../(react-query)/react-query.key-factory';
import { type SeriesCategory, SeriesCategorySchema } from '../(types)/series';

export const revalidate = 3600;

export function generateStaticParams() {
  return ALL_SERIES_CATEGORIES.map((series) => {
    return {
      series,
    };
  });
}

export async function generateMetadata(props: {
  params: Promise<{ series: SeriesCategory }>;
}): Promise<Metadata> {
  try {
    const params = await props.params;
    const metaTitle = match(params.series)
      .with('sound', () => 'COLDSURF Blog: Article about music')
      .with('tech', () => 'COLDSURF Blog: Article about Software Development')
      .with('text', () => 'COLDSURF Blog: Article about Books & Texts')
      .with('video', () => 'COLDSURF Blog: Article about films and videos')
      .exhaustive();

    const metaDescription = match(params.series)
      .with('sound', () => 'Article about music')
      .with('tech', () => 'Article about Software Development')
      .with('text', () => 'Article about Books & Texts')
      .with('video', () => 'Article about films and videos')
      .exhaustive();

    return generateLogListMetadata({
      title: metaTitle,
      description: metaDescription,
      seriesCategory: params.series,
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
    series: SeriesCategory;
  }>;
}) {
  const params = await props.params;

  const { children } = props;

  const seriesValidation = SeriesCategorySchema.safeParse(params.series);
  if (!seriesValidation.success) {
    redirect('/blog');
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    queryKeyFactory.series.list({
      seriesCategory: params.series,
      appLocale: 'ko',
    })
  );
  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
