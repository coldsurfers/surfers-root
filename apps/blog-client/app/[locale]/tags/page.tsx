import { getTags } from '@/lib'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { TagsPageClient } from './page.client'

export default async function TagsPage({ params }: PageProps) {
  const { locale } = params
  setRequestLocale(locale)

  const allTags = await getTags()

  return <TagsPageClient tags={allTags} />
}
