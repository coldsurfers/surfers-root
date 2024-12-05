import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'

import { NotionAPI } from 'notion-client'
import { WritersPageClient } from './page.client'

const notion = new NotionAPI({
  authToken: process.env.NOTION_AUTH_TOKEN,
  activeUser: process.env.NOTION_ACTIVE_USER,
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function WritersPage({ params }: PageProps) {
  const { locale } = params
  const recordMap = await notion.getPage(
    locale === 'en' ? 'Paul-En-1532bbac5782801f9180fb0761ddf1a5' : 'Paul-1412bbac5782807b9a09e92c3dccaaa3',
  )
  setRequestLocale(locale)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryKeyFactory.users.list)
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <WritersPageClient recordMap={recordMap} />
    </HydrationBoundary>
  )
}
