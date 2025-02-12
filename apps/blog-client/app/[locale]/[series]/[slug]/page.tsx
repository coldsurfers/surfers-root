'use client'
import { use } from 'react'

import { LogDetailRenderer } from '@/features'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory } from '@/lib/types/series'

export default function SeriesSlugPage(props: {
  params: Promise<{
    slug: string
    series: SeriesCategory
    locale: AppLocale
  }>
}) {
  const params = use(props.params)
  return <LogDetailRenderer slug={params.slug} locale={params.locale} seriesCategory={params.series} />
}
