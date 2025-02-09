import { generateLogListMetadata } from '@/lib/metadata'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory, SeriesCategorySchema } from '@/lib/types/series'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { redirect, routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next/types'
import { ReactNode } from 'react'
import { match } from 'ts-pattern'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export function generateMetadata({
  params,
}: PageProps<{
  series: SeriesCategory
}>): Metadata {
  const metaTitle = match(params.series)
    .with('sound', () => 'COLDSURF Blog: Article about music')
    .with('tech', () => 'COLDSURF Blog: Article about Software Development')
    .with('text', () => 'COLDSURF Blog: Article about Books & Texts')
    .with('video', () => 'COLDSURF Blog: Article about films and videos')
    .exhaustive()

  const metaDescription = match(params.series)
    .with('sound', () => 'Article about music')
    .with('tech', () => 'Article about Software Development')
    .with('text', () => 'Article about Books & Texts')
    .with('video', () => 'Article about films and videos')
    .exhaustive()

  return generateLogListMetadata({
    title: metaTitle,
    description: metaDescription,
    locale: params.locale,
    seriesCategory: params.series,
  })
}

export default async function SeriesPageLayout({
  params,
  children,
}: {
  children: ReactNode
  params: {
    locale: AppLocale
    series: SeriesCategory
  }
}) {
  setRequestLocale(params.locale)

  const seriesValidation = SeriesCategorySchema.safeParse(params.series)
  if (!seriesValidation.success) {
    return redirect({ href: '/404', locale: params.locale })
  }

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    queryKeyFactory.series.list({
      seriesCategory: params.series,
      appLocale: params.locale,
    }),
  )
  const dehydratedState = dehydrate(queryClient)

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
}
