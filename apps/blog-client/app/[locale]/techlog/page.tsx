import { queryLogs } from '@/lib/utils'
import { AppLocale, PageProps } from 'i18n/types'
import { TechlogPageClient } from './page.client'

export const revalidate = 3600

async function initPage(locale: AppLocale) {
  return await await queryLogs('techlog', locale)
}

export default async function TechlogPage({ params }: PageProps) {
  const logs = await initPage(params.locale)

  return <TechlogPageClient logs={logs} />
}
