import { queryLogs } from '@/lib/utils'
import { SurflogPageClient } from './page.client'

export const revalidate = 3600

async function initPage(locale: 'ko' | 'en') {
  return await await queryLogs('surflog', locale)
}

export default async function SurflogPage({ params }: { params: { locale: 'ko' | 'en' } }) {
  const logs = await initPage(params.locale)

  return <SurflogPageClient logs={logs} />
}
