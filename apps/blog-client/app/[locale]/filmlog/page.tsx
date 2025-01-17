import { generateLogListMetadata } from '@/lib/metadata'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { LogListPage, PageLayout } from '@/ui'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next/types'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const metaTitle = 'COLDSURF Blog: Article about films and videos'
  const metaDescription = 'Article about films and videos'

  return generateLogListMetadata({
    title: metaTitle,
    description: metaDescription,
    locale: params.locale,
    logType: 'filmlog',
  })
}

export default async function FilmLogPage({ params, searchParams }: PageProps) {
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  const page = searchParams['page'] ? Number(searchParams['page']) : 1
  await queryClient.prefetchQuery(
    queryKeyFactory.logs.list({
      platform: 'filmlog',
      locale: params.locale,
    }),
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout title="VIDEO">
        <LogListPage locale={params.locale} platform="filmlog" page={page} />
      </PageLayout>
    </HydrationBoundary>
  )
}
