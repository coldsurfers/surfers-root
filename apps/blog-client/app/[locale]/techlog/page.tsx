import { queryLogs } from '@/lib/utils'
import { LogListPage } from '@/ui'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function TechlogPage({ params }: PageProps) {
  setRequestLocale(params.locale)
  const logs = await queryLogs('techlog', params.locale)

  return <LogListPage logs={logs} />
}
