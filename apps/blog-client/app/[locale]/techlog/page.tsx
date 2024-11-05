import { queryLogs } from '@/lib/utils'
import { routing } from 'i18n/routing'
import { AppLocale, PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { TechlogPageClient } from './page.client'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function initPage(locale: AppLocale) {
  return await await queryLogs('techlog', locale)
}

export default async function TechlogPage({ params }: PageProps) {
  setRequestLocale(params.locale)
  const logs = await initPage(params.locale)

  return <TechlogPageClient logs={logs} />
}
