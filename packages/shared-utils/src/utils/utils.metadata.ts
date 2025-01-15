import { MusicEvent, WebSite, WithContext } from 'schema-dts'

type BaseData = {
  keywords: string[]
  icons: {
    icon: string
    shortcut: string
    apple: string
  }
  metadataBase: URL
  appLinks?: {
    ios?: {
      app_name: string
      app_store_id: string
      url: string
    }
  }
  twitter?: {
    app?: {
      id: {
        /**
         * app store id
         */
        iphone: string
      }
      name: string
      url: {
        /**
         * app store url
         */
        iphone: string
      }
    }
    card: 'app'
  }
}

export class NextMetadataGenerator {
  public baseData: BaseData
  constructor({ baseData }: { baseData: BaseData }) {
    this.baseData = baseData
  }

  public generateMetadata<T>(additionalMetadata: {
    keywords?: string[]
    title?: string
    description?: string
    other?: Record<string, unknown>
    openGraph?: Record<string, unknown>
  }): T {
    const { icons, metadataBase, appLinks, keywords, twitter } = this.baseData
    return {
      ...additionalMetadata,
      icons,
      metadataBase,
      appLinks,
      keywords: [...keywords, ...(additionalMetadata.keywords ?? [])],
      twitter,
    } as T
  }

  public generateLdJson(
    params:
      | {
          type: 'WebSite'
          url: string
          name: string
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
        }
      | {
          type: 'Brand'
          name: string
          image: string
          logo: string
          url: string
          sameAs: string[]
        },
  ) {
    switch (params.type) {
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'url': params.url,
          'name': params.name,
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
      case 'Brand':
        return {
          '@context': 'http://schema.org',
          '@type': 'Brand',
          'name': params.name,
          'image': params.image,
          'logo': params.logo,
          'url': params.url,
          'sameAs': params.sameAs,
        } satisfies WithContext<Brand>
      default:
        return {}
    }
  }
}
