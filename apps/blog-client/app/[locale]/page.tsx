import { queryLogs } from '@/lib/utils'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import PageClient from './page.client'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const Page = async ({ params }: PageProps) => {
  setRequestLocale(params.locale)
  const techlogs = await queryLogs('techlog', params.locale)
  const surflogs = await queryLogs('surflog', params.locale)
  return <PageClient techlogs={techlogs} surflogs={surflogs} />
}

export default Page
