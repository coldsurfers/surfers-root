'use client';
import { Suspense, use } from 'react';

import { GlobalErrorBoundaryRegistry } from '@/libs/registries/global-error-boundary-registry';
import { LogDetailRenderer } from 'app/blog/(notion-render)/log-detail-renderer';
import { AppLocaleSchema } from 'app/blog/(types)/i18n';
import type { SeriesCategory } from 'app/blog/(types)/series';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

const appLocaleParser = parseAsStringLiteral(
  AppLocaleSchema.options // -> readonly ['ko','en']
).withDefault('ko');

export default function SeriesSlugPage(props: {
  params: Promise<{
    slug: string;
    series: SeriesCategory;
  }>;
}) {
  const params = use(props.params);
  const [lang, setLang] = useQueryState('lang', appLocaleParser);

  return (
    <GlobalErrorBoundaryRegistry>
      <Suspense>
        <LogDetailRenderer
          slug={params.slug}
          locale={lang}
          seriesCategory={params.series}
          onClickAppLocale={setLang}
        />
      </Suspense>
    </GlobalErrorBoundaryRegistry>
  );
}
