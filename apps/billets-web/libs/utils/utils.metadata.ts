import { Metadata } from 'next'
import { APP_STORE_ID, APP_STORE_URL, SITE_URL } from '../constants'

export function generateBilletsMetadata(metadata: Metadata): Metadata {
  const baseKeywords = [
    'Billets',
    'Tickets',
    '공연',
    '티켓',
    '내한공연',
    '공연알림',
    '공연검색',
    '인디밴드',
    '페스티벌',
    '락공연',
    '해리스타일스공연',
    '외국내한',
    '티켓팅',
    '티켓',
    '인터파크티켓',
    '예스24티켓',
    '예스24라이브',
    'dice',
    'ticket',
    'songkick',
    'Festival',
    'Rock Festival',
    'Concert',
  ]

  const icons = {
    icon: '/logo.png',
  }

  const metadataBase = new URL(SITE_URL)

  const appLinks = {
    ios: {
      app_name: 'Billets',
      app_store_id: APP_STORE_ID,
      url: APP_STORE_URL,
    },
  }

  return {
    ...metadata,
    icons,
    metadataBase,
    appLinks,
    keywords: [...baseKeywords, ...(metadata.keywords ?? [])],
    twitter: {
      app: {
        id: {
          iphone: APP_STORE_ID,
        },
        name: 'Billets',
        url: {
          iphone: APP_STORE_URL,
        },
      },
      card: 'app',
    },
  }
}
