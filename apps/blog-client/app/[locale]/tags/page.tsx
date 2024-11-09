import { getTags } from '@/lib'
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

  const allTags = await getTags()

  return <TagsPageClient tags={allTags} />
}
