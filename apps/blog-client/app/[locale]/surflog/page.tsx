import { queryLogs } from '@/lib/utils'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { SurflogPageClient } from './page.client'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function initPage(locale: 'ko' | 'en') {
  return await await queryLogs('surflog', locale)
}

export default async function SurflogPage({ params }: PageProps) {
  setRequestLocale(params.locale)
  const logs = await initPage(params.locale)

  return <SurflogPageClient logs={logs} />
}
