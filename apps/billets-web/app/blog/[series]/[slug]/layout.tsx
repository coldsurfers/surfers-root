import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { TEMP_FIXED_APP_LOCALE } from 'app/blog/(constants)'
import { generateLogDetailMetadata } from 'app/blog/(metadata)'
import { queryAllSeries, querySeriesItem } from 'app/blog/(notion)/query'
import { queryKeyFactory } from 'app/blog/(react-query)/react-query.key-factory'
import { SeriesCategory } from 'app/blog/(types)/series'
import { ReactNode } from 'react'

export const revalidate = 3600

export async function generateStaticParams() {
  const allSeriesItems = await queryAllSeries({
    lang: 'ko',
  })
  return allSeriesItems.map((value) => ({ slug: value.slug, series: value.seriesCategory }))
}

export async function generateMetadata(props: { params: Promise<{ series: SeriesCategory; slug: string }> }) {
  const params = await props.params
  const page = await querySeriesItem({ slug: params.slug, lang: TEMP_FIXED_APP_LOCALE, seriesCategory: params.series })
  return generateLogDetailMetadata(page, { slug: params.slug, seriesCategory: params.series })
}

export default async function SeriesSlugPageLayout(props: {
  children: ReactNode
  params: Promise<{ series: SeriesCategory; slug: string }>
}) {
  const params = await props.params

  const { children } = props

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    queryKeyFactory.series.item(params.slug, {
      appLocale: 'ko',
      seriesCategory: params.series,
    }),
  )
  const dehydratedState = dehydrate(queryClient)
  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
}
