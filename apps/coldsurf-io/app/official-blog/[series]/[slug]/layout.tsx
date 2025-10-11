import { TEMP_FIXED_APP_LOCALE } from 'app/blog/(constants)';
import { generateLogDetailMetadata } from 'app/blog/(metadata)';
import { queryAllSeries, querySeriesItem } from 'app/blog/(notion)/query';
import type { AppLocale } from 'app/blog/(types)/i18n';
import { OfficialBlogSeriesCategorySchema } from 'app/blog/(types)/series';
import { createBlogError } from 'app/blog/(utils)';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';

export const revalidate = 3600;
export const dynamic = 'force-static';

const DEFAULT_APP_LOCALE: AppLocale = 'ko';

export async function generateStaticParams() {
  const allSeriesItems = await queryAllSeries({
    lang: DEFAULT_APP_LOCALE,
    isOfficialBlog: true,
  });
  return allSeriesItems.map((value) => ({
    slug: value.slug,
    series: value.officialBlogSeriesCategory,
  }));
}

export async function generateMetadata(props: {
  params: LayoutProps<'/official-blog/[series]/[slug]'>['params'];
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
  const page = await querySeriesItem({
    slug: params.slug,
    lang: TEMP_FIXED_APP_LOCALE,
    seriesCategory: seriesCategoryValidation.data,
    isOfficialBlog: true,
  });
  return generateLogDetailMetadata(page, {
    slug: params.slug,
    seriesCategory: seriesCategoryValidation.data,
  });
}

export default async function OfficialBlogSeriesSlugLayout(props: {
  children: ReactNode;
  params: Promise<{ series: string; slug: string }>;
}) {
  const { children } = props;
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
  return <>{children}</>;
}
