import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { PageLayout } from '@/ui'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import PageClient from './page.client'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootPage({ params, searchParams }: PageProps) {
  const page = searchParams['page'] ? Number(searchParams['page']) : 1
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  const promises = [
    queryClient.prefetchQuery(
      queryKeyFactory.series.list({
        appLocale: params.locale,
        series: 'YMWT',
      }),
    ),
    queryClient.prefetchQuery(
      queryKeyFactory.series.list({
        appLocale: params.locale,
        series: 'YMLT',
      }),
    ),
    queryClient.prefetchQuery(
      queryKeyFactory.series.list({
        appLocale: params.locale,
        series: 'YMRT',
      }),
    ),
    queryClient.prefetchQuery(
      queryKeyFactory.series.list({
        appLocale: params.locale,
        series: 'YMCT',
      }),
    ),
    // queryClient.prefetchQuery(
    //   queryKeyFactory.logs.list({
    //     platform: 'filmlog',
    //     locale: params.locale,
    //   }),
    // ),
    // queryClient.prefetchQuery(
    //   queryKeyFactory.logs.list({
    //     platform: 'soundlog',
    //     locale: params.locale,
    //   }),
    // ),
    // queryClient.prefetchQuery(
    //   queryKeyFactory.logs.list({
    //     platform: 'squarelog',
    //     locale: params.locale,
    //   }),
    // ),
    // queryClient.prefetchQuery(
    //   queryKeyFactory.logs.list({
    //     platform: 'textlog',
    //     locale: params.locale,
    //   }),
    // ),
  ]

  await Promise.all(promises)

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout>
        <PageClient locale={params.locale} page={page} />
      </PageLayout>
    </HydrationBoundary>
  )
}
