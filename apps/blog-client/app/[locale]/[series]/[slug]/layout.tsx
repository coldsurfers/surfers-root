import { queryAllSeries, querySeriesItem } from '@/features'
import { generateLogDetailMetadata } from '@/lib/metadata'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory } from '@/lib/types/series'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

export const revalidate = 3600

export async function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }))
  const promises = locales.map(
    async (locale) =>
      await queryAllSeries({
        lang: locale.locale,
      }),
  )
  const result = (await Promise.all(promises)).flat()
  return result.map((value) => ({ slug: value.slug, locale: value.lang }))
}

export async function generateMetadata(props: {
  params: Promise<{ series: SeriesCategory; slug: string; locale: AppLocale }>
}) {
  const params = await props.params
  const page = await querySeriesItem({ slug: params.slug, lang: params.locale, seriesCategory: params.series })
  return generateLogDetailMetadata(page, { locale: params.locale, slug: params.slug, seriesCategory: params.series })
}

export default async function SeriesSlugPageLayout(props: {
  children: ReactNode
  params: Promise<{ series: SeriesCategory; slug: string; locale: AppLocale }>
}) {
  const params = await props.params

  const { children } = props

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
