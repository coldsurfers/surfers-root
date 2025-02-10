'use client'

import { LogDetailRenderer } from '@/features'
import { SeriesCategory } from '@/lib/types/series'
import { PageProps } from 'i18n/types'

export default function SeriesSlugPage({
  params,
}: PageProps<{
  slug: string
  series: SeriesCategory
}>) {
  return <LogDetailRenderer slug={params.slug} locale={params.locale} seriesCategory={params.series} />
}
