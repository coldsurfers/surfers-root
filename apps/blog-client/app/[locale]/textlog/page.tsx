import { generateLogListMetadata } from '@/lib/metadata'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { LogListPage, PageLayout } from '@/ui'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const metaTitle = 'COLDSURF Blog: Article about Books & Texts'
  const metaDescription = 'Article about Books & Texts'

  return generateLogListMetadata({
    title: metaTitle,
    description: metaDescription,
    locale: params.locale,
    logType: 'textlog',
  })
}

export default async function TextLogPage({ params, searchParams }: PageProps) {
  const page = searchParams['page'] ? Number(searchParams['page']) : 1
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    queryKeyFactory.logs.list({
      platform: 'textlog',
      locale: params.locale,
    }),
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout title="TEXT">
        <LogListPage locale={params.locale} platform="textlog" page={page} />
      </PageLayout>
    </HydrationBoundary>
  )
}
