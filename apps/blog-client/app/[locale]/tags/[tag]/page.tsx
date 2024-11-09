import { getTags, queryLogs } from '@/lib'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { TagDetailPageClient } from './page.client'

export async function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }))
  const allTags = await getTags()
  const params = locales
    .map((locale) => {
      return allTags.map((tag) => {
        return {
          tag: tag.name,
          locale: locale.locale,
        }
      })
    })
    .flat()
  return params
}

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

  return <TagDetailPageClient tag={decodedTag} logs={result} />
}
