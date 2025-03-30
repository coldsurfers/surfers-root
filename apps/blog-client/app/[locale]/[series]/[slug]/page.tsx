'use client'
import { Suspense, use } from 'react'

import { LogDetailRenderer } from '@/features'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory } from '@/lib/types/series'
import { GlobalErrorBoundaryRegistry } from '@/ui/errors/global-error-boundary-registry'

export default function SeriesSlugPage(props: {
  params: Promise<{
    slug: string
    series: SeriesCategory
    locale: AppLocale
  }>
}) {
  const params = use(props.params)
  return (
    <GlobalErrorBoundaryRegistry>
      <Suspense>
        <LogDetailRenderer slug={params.slug} locale={params.locale} seriesCategory={params.series} />
      </Suspense>
    </GlobalErrorBoundaryRegistry>
  )
}
