import { TEMP_FIXED_APP_LOCALE } from 'app/blog/(constants)';
import { generateLogDetailMetadata } from 'app/blog/(metadata)';
import { queryAllSeries, querySeriesItem } from 'app/blog/(notion)/query';
import type { AppLocale } from 'app/blog/(types)/i18n';
import type { SeriesCategory } from 'app/blog/(types)/series';
import type { ReactNode } from 'react';

export const revalidate = 3600;
export const dynamic = 'force-static';
// 사전에 생성되지 않은 경로로 SSR 접근 시, 404
// export const dynamicParams = false;

const DEFAULT_APP_LOCALE: AppLocale = 'ko';

export async function generateStaticParams() {
  const allSeriesItems = await queryAllSeries({
    lang: DEFAULT_APP_LOCALE,
  });
  return allSeriesItems.map((value) => ({ slug: value.slug, series: value.seriesCategory }));
}

export async function generateMetadata(props: {
  params: Promise<{ series: SeriesCategory; slug: string }>;
}) {
  const params = await props.params;
  const page = await querySeriesItem({
    slug: params.slug,
    lang: TEMP_FIXED_APP_LOCALE,
    seriesCategory: params.series,
  });
  return generateLogDetailMetadata(page, { slug: params.slug, seriesCategory: params.series });
}

export default async function SeriesSlugPageLayout(props: {
  children: ReactNode;
  params: Promise<{ series: SeriesCategory; slug: string }>;
}) {
  const { children } = props;
  return <>{children}</>;
}
