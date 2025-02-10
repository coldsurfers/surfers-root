import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { PageLayout } from '@/ui'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'

import { NotionRenderer } from '@/features/notion/notion-renderer'
import { SITE_URL } from '@/lib/constants'
import { metadataInstance } from '@/lib/metadata'
import { Metadata } from 'next/types'
import { NotionAPI } from 'notion-client'
import { StyledAboutPageInnerLayout, StyledWritersPageHeader } from './page.styled'

const notion = new NotionAPI({
  authToken: process.env.NOTION_AUTH_TOKEN,
  activeUser: process.env.NOTION_ACTIVE_USER,
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: PageProps) {
  const metaTitle = 'COLDSURF Blog: Writers & Members'
  const metaDescription = 'Introduce our writers and members'

  const meta = metadataInstance.generateMetadata<Metadata>({
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      url: `${SITE_URL}/${params.locale}/writers`,
    },
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/writers`,
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}/writers`])),
    },
  })

  return meta
}

export default async function WritersPage({ params }: PageProps) {
  const { locale } = params
  const recordMap = await notion.getPage(
    locale === 'en' ? 'about-2025-En-18d2bbac578280bc9271f7d4ab58b33a' : 'about-2025-18d2bbac5782804d8c88dc076b26c359',
  )
  setRequestLocale(locale)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryKeyFactory.users.list)
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout title="ABOUT">
        <StyledAboutPageInnerLayout>
          <StyledWritersPageHeader>
            <NotionRenderer recordMap={recordMap} />
          </StyledWritersPageHeader>
        </StyledAboutPageInnerLayout>
      </PageLayout>
    </HydrationBoundary>
  )
}
