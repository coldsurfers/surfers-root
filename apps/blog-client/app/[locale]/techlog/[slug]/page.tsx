import { LogDetailRenderer, queryLogs } from '@/features'
import { queryTechlogDetail } from '@/features/logs/logs.query'
import { generateLogDetailMetadata } from '@/lib/metadata/metadata-instance'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'

export const revalidate = 3600

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }))
  const promises = locales.map(async (locale) => await queryLogs('techlog', locale.locale))
  const result = (await Promise.all(promises)).flat()
  return result.map((value) => ({ slug: value.slug, locale: value.lang }))
}

export async function generateMetadata({ params }: PageProps<{ slug: string }>) {
  const page = await queryTechlogDetail({ slug: params.slug ?? '', lang: params.locale })
  return generateLogDetailMetadata(page, { locale: params.locale, slug: params.slug, logType: 'techlog' })
}

export default async function Page({ params }: PageProps<{ slug: string }>) {
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  try {
    await queryClient.prefetchQuery(
      queryKeyFactory.logs.detail(params.slug, {
        platform: 'techlog',
        locale: params.locale,
      }),
    )
  } catch (e) {
    console.error(e)
  }
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <LogDetailRenderer slug={params.slug} locale={params.locale} platform="techlog" />
    </HydrationBoundary>
  )
}
