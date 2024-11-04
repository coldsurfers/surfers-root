import { queryLogs } from '@/lib/utils'
import PageClient from './page.client'

export const revalidate = 3600

const Page = async () => {
  const techlogs = await queryLogs('techlog')
  const surflogs = await queryLogs('surflog')
  return <PageClient techlogs={techlogs} surflogs={surflogs} />
}

export default Page
