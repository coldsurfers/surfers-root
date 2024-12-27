import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { LogListPage } from '@/ui'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function SoundLogPage({ params, searchParams }: PageProps) {
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  const page = searchParams['page'] ? Number(searchParams['page']) : 1
  await queryClient.prefetchQuery(
    queryKeyFactory.logs.list({
      platform: 'soundlog',
      locale: params.locale,
    }),
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <LogListPage locale={params.locale} platform="soundlog" page={page} />
    </HydrationBoundary>
  )
}
