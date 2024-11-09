import { queryLogs } from '@/lib'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { TagDetailPageClient } from './page.client'

export default async function TagDetailPage({
  params,
}: PageProps<{
  tag: string
}>) {
  const { tag, locale } = params
  const decodedTag = decodeURIComponent(tag)
  setRequestLocale(locale)
  const promises = [
    queryLogs('surflog', locale, { tag: decodedTag }),
    queryLogs('techlog', locale, { tag: decodedTag }),
  ]
  const result = (await Promise.all(promises)).flat()

  return <TagDetailPageClient logs={result} />
}
