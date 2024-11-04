import { queryLogs } from '@/lib/utils'
import PageClient from './page.client'

export const revalidate = 3600

const Page = async ({ params }: { params: { locale: 'ko' | 'en' } }) => {
  const techlogs = await queryLogs('techlog', params.locale)
  const surflogs = await queryLogs('surflog', params.locale)
  return <PageClient techlogs={techlogs} surflogs={surflogs} />
}

export default Page
