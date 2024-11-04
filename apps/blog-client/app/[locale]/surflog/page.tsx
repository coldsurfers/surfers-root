import { queryLogs } from '@/lib/utils'
import { SurflogPageClient } from './page.client'

export const revalidate = 3600

async function initPage() {
  return await await queryLogs('surflog')
}

export default async function SurflogPage() {
  const logs = await initPage()

  return <SurflogPageClient logs={logs} />
}
