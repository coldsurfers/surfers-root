import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { LogListPage, PageLayout } from '@/ui'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function TechlogPage({ params, searchParams }: PageProps) {
  const page = searchParams['page'] ? Number(searchParams['page']) : 1
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    queryKeyFactory.logs.list({
      platform: 'techlog',
      locale: params.locale,
    }),
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout title="TECH">
        <LogListPage locale={params.locale} platform="techlog" page={page} />
      </PageLayout>
    </HydrationBoundary>
  )
}
