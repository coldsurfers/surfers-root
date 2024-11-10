import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
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

export const fetchGetLogDetail = async (slug: string, filters: { platform: string; locale: AppLocale }) => {
  const { platform, locale } = filters
  const response = await fetch(`${BASE_URL}/api/logs/${slug}?platform=${platform}&locale=${locale}`, {
    method: 'GET',
  })
  const json = (await response.json()) as {
    page: PageObjectResponse
    blocks: never[]
  }

  return json
}
