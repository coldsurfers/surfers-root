import { querySeries, querySeriesItem } from '@/features'
import { generateLogDetailMetadata } from '@/lib/metadata'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { SeriesCategory } from '@/lib/types/series'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

export const revalidate = 3600

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams({ params }: PageProps<{ series: SeriesCategory; slug: string }>) {
  const locales = routing.locales.map((locale) => ({ locale }))
  const promises = locales.map(
    async (locale) =>
      await querySeries({
        lang: locale.locale,
        seriesCategory: params.series,
      }),
  )
  const result = (await Promise.all(promises)).flat()
  return result.map((value) => ({ slug: value.slug, locale: value.lang }))
}

export async function generateMetadata({ params }: PageProps<{ series: SeriesCategory; slug: string }>) {
  const page = await querySeriesItem({ slug: params.slug, lang: params.locale, seriesCategory: params.series })
  return generateLogDetailMetadata(page, { locale: params.locale, slug: params.slug, seriesCategory: params.series })
}

export default async function SeriesSlugPageLayout({
  params,
  children,
}: PageProps<{ series: SeriesCategory; slug: string }> & { children: ReactNode }) {
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    queryKeyFactory.series.item(params.slug, {
      appLocale: params.locale,
      seriesCategory: params.series,
    }),
  )
  const dehydratedState = dehydrate(queryClient)
  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
}
