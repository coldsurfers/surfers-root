import { fetchGetLogs } from '@/lib/fetchers'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import PageClient from './page.client'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootPage({ params }: PageProps) {
  setRequestLocale(params.locale)
  const queryClient = new QueryClient()
  const promises = [
    queryClient.prefetchQuery({
      queryKey: [
        'logs',
        {
          locale: params.locale,
          platform: 'surflog',
        },
      ],
      queryFn: async () =>
        await fetchGetLogs({
          locale: params.locale,
          platform: 'surflog',
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: [
        'logs',
        {
          locale: params.locale,
          platform: 'techlog',
        },
      ],
      queryFn: async () =>
        await fetchGetLogs({
          locale: params.locale,
          platform: 'techlog',
        }),
    }),
  ]

  await Promise.all(promises)

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <PageClient locale={params.locale} />
    </HydrationBoundary>
  )
}
