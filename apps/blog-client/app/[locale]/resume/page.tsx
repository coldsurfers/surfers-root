import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import PageClient from './page.client'

export const revalidate = 3600

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const pageTitle = `Resume | Blog, ColdSurf`
  const pageDesc = 'resume'
  return {
    title: pageTitle,
    description: pageDesc,
  }
}

const ResumePage = async ({ params }: PageProps) => {
  setRequestLocale(params.locale)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryKeyFactory.resumes.detail({ locale: params.locale }))
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageClient locale={params.locale} />
    </HydrationBoundary>
  )
}

export default ResumePage
