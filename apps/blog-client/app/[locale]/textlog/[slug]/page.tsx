// prismjs
import { LogDetailRenderer, queryLogs, queryTextlogDetail } from '@/features'
import { generateLogDetailMetadata } from '@/lib/metadata/metadata-instance'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next/types'

export const revalidate = 3600

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }))
  const promises = locales.map(async (locale) => await queryLogs('textlog', locale.locale))
  const result = (await Promise.all(promises)).flat()
  return result.map((value) => ({ slug: value.slug, locale: value.lang }))
}

export async function generateMetadata({ params }: PageProps<{ slug: string }>): Promise<Metadata> {
  const page = await queryTextlogDetail({ slug: params?.slug ?? '', lang: params.locale })
  return generateLogDetailMetadata(page, { locale: params.locale, slug: params.slug, logType: 'textlog' })
}

export default async function Page({ params }: PageProps<{ slug: string }>) {
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    queryKeyFactory.logs.detail(params.slug, {
      platform: 'textlog',
      locale: params.locale,
    }),
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <LogDetailRenderer slug={params.slug} locale={params.locale} platform="textlog" />
    </HydrationBoundary>
  )
}
