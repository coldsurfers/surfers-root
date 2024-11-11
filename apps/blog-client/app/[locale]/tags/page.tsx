import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { TagsPageClient } from './page.client'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function TagsPage({ params }: PageProps) {
  const { locale } = params
  setRequestLocale(locale)
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(queryKeyFactory.tags.list)

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <TagsPageClient />
    </HydrationBoundary>
  )
}
