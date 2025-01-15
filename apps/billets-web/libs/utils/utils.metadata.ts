import { MusicEvent, WebSite, WithContext } from 'schema-dts'
import { SITE_URL } from '../constants'

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
