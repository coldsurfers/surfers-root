import { generateLogListMetadata } from '@/lib/metadata'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory, SeriesCategorySchema } from '@/lib/types/series'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'
import { ReactNode, Suspense } from 'react'
import { match } from 'ts-pattern'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: {
  params: Promise<{ series: SeriesCategory; locale: AppLocale }>
}): Promise<Metadata> {
  const params = await props.params
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

export default async function SeriesPageLayout(props: {
  children: ReactNode
  params: Promise<{
    locale: AppLocale
    series: SeriesCategory
  }>
}) {
  const params = await props.params

  const { children } = props

  setRequestLocale(params.locale)

  const seriesValidation = SeriesCategorySchema.safeParse(params.series)
  if (!seriesValidation.success) {
    notFound()
  }

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    queryKeyFactory.series.list({
      seriesCategory: params.series,
      appLocale: params.locale,
    }),
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <Suspense>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </Suspense>
  )
}
