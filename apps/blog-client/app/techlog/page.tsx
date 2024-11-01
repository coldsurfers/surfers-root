import { queryLogs } from '@/lib/utils'
import { TechlogPageClient } from './page.client'

export const revalidate = 3600

async function initPage() {
  return await await queryLogs('techlog')
}

export default async function TechlogPage() {
  const logs = await initPage()

  return <TechlogPageClient logs={logs} />
}
