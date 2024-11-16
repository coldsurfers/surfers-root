import { queryTags } from '@/features'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { TagsTagPageClient } from './page.client'

export async function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }))
  const allTags = await queryTags()
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

  const queryClient = getQueryClient()
  const promises = [
    queryClient.prefetchQuery(
      queryKeyFactory.logs.list({
        platform: 'techlog',
        locale,
        tag: decodedTag,
      }),
    ),
    queryClient.prefetchQuery(
      queryKeyFactory.logs.list({
        platform: 'surflog',
        locale,
        tag: decodedTag,
      }),
    ),
  ]
  await Promise.all(promises)
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <TagsTagPageClient locale={locale} tag={decodedTag} />
    </HydrationBoundary>
  )
}
