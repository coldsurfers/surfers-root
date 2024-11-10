import { AppLocale } from 'i18n/types'
import { queryLogs } from '../utils'

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://blog.coldsurf.io'

export const fetchGetLogs = async ({ platform, locale }: { platform: 'techlog' | 'surflog'; locale: AppLocale }) => {
  const response = await fetch(`${BASE_URL}/api/logs?platform=${platform}&locale=${locale}`, {
    method: 'GET',
  })
  const json = (await response.json()) as {
    logs: Awaited<ReturnType<typeof queryLogs>>
  }
  const { logs } = json
  return logs
}
