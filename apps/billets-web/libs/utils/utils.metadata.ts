import { Metadata } from 'next'
import { MusicEvent, WebSite, WithContext } from 'schema-dts'
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
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon.ico',
    apple: '/icons/favicon.ico',
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

export function generateBilletsLdJson(
  params:
    | {
        type: 'WebSite'
      }
    | {
        type: 'MusicEvent'
        url: string
        name: string
        startDate: string
        endDate: string
        venue: {
          name: string
          address: string
          latitude: number
          longitude: number
        }
        images: string[]
        description: string
        offers: {
          price: number
          currency: string
          url: string
          validFrom: string
          name?: string
        }[]
      },
) {
  switch (params.type) {
    case 'WebSite':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'url': SITE_URL,
        'name': 'Billets',
      } satisfies WithContext<WebSite>
    case 'MusicEvent':
      return {
        '@context': 'https://schema.org',
        '@type': 'MusicEvent',
        'url': params.url,
        'name': params.name,
        'startDate': params.startDate,
        'endDate': params.endDate,
        'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
        'eventStatus': 'https://schema.org/EventScheduled',
        'location': [
          {
            '@type': 'Place',
            'name': params.venue.name,
            'address': params.venue.address,
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': params.venue.latitude,
              'longitude': params.venue.longitude,
            },
          },
        ],
        'image': params.images,
        'description': params.description,
        'offers': params.offers.map((offer) => {
          return {
            '@type': 'Offer',
            'availability': 'https://schema.org/InStock',
            'price': offer.price,
            'priceCurrency': offer.currency,
            'url': offer.url,
            'validFrom': offer.validFrom,
            'name': offer.name,
          }
        }),
        'organizer': {
          '@type': 'Organization',
          'name': params.venue.name,
        },
      } satisfies WithContext<MusicEvent>
    default:
      return {}
  }
}
