import { FetchGetSeriesItemSearchParams } from '@/app/api/series/[slug]/types'
import { FetchGetSeriesSearchParams } from '@/app/api/series/types'
import { PageObjectResponse, PersonUserObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { ExtendedRecordMap } from 'notion-types'
import { AppLocale } from '../types/i18n'
import { SeriesItemSchema } from '../types/series'

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://blog.coldsurf.io'

export const fetchGetSeries = async (params: FetchGetSeriesSearchParams) => {
  const { seriesCategory, appLocale, tag } = params
  let url = `${BASE_URL}/api/series?seriesCategory=${seriesCategory}&appLocale=${appLocale}`
  if (tag) {
    url += `&tag=${tag}`
  }
  const response = await fetch(url, {
    method: 'GET',
  })
  const json = await response.json()
  const validation = SeriesItemSchema.array().safeParse(json)
  if (!validation.success) {
    console.error('fetch error, fetchGetSeries', params, validation.error)
    return []
  }
  return validation.data
}

export const fetchGetSeriesItem = async (slug: string, searchParams: FetchGetSeriesItemSearchParams) => {
  const { seriesCategory, appLocale } = searchParams
  const url = `${BASE_URL}/api/series/${slug}?seriesCategory=${seriesCategory}&appLocale=${appLocale}`
  const response = await fetch(url, {
    method: 'GET',
  })
  const json = await response.json()
  return json as {
    page: PageObjectResponse
    recordMap: ExtendedRecordMap
  }
}

export const fetchGetLogDetail = async (slug: string, filters: { platform: string; locale: AppLocale }) => {
  try {
    const { platform, locale } = filters
    const response = await fetch(`${BASE_URL}/api/logs/${slug}?platform=${platform}&locale=${locale}`, {
      method: 'GET',
    })
    const json = (await response.json()) as {
      page: PageObjectResponse
      blocks: never[]
      recordMap: ExtendedRecordMap
    }

    return json
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const fetchGetUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'GET',
  })
  const json = (await response.json()) as {
    users: PersonUserObjectResponse[]
  }
  return json
}

export const fetchGetResume = async (filters: { locale: AppLocale }) => {
  const response = await fetch(`${BASE_URL}/api/resume?locale=${filters.locale}`, {
    method: 'GET',
  })
  const json = (await response.json()) as {
    blocks: {
      career: never[]
      side: never[]
    }
  }
  return json
}

export const fetchGetTags = async () => {
  const response = await fetch(`${BASE_URL}/api/tags`, {
    method: 'GET',
  })
  const json = (await response.json()) as {
    tags: {
      id: string
      name: string
      color: string
    }[]
  }
  return json
}
