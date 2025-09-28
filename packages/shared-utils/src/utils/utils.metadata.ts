import type {
  Brand,
  MusicEvent,
  PerformingGroup,
  Place,
  WebPage,
  WebSite,
  WithContext,
} from 'schema-dts';

type BaseData = {
  keywords: string[];
  icons: {
    icon: string;
    shortcut: string;
    apple: string;
  };
  metadataBase: URL;
  appLinks?: {
    ios?: {
      app_name: string;
      app_store_id: string;
      url: string;
    };
  };
  twitter?: {
    app?: {
      id: {
        /**
         * app store id
         */
        iphone: string;
      };
      name: string;
      url: {
        /**
         * app store url
         */
        iphone: string;
      };
    };
    card: 'app';
  };
  openGraph?: {
    siteName: string;
  };
};

type CustomMusicEvent = {
  type: 'MusicEvent';
  url: string;
  name: string;
  startDate: string;
  endDate: string;
  venue: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  images: string[];
  description: string;
  offers: {
    price: number;
    currency: string;
    url: string;
    validFrom: string;
    name?: string;
  }[];
};

function generateMusicEvent(event: CustomMusicEvent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    url: event.url,
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: [
      {
        '@type': 'Place',
        name: event.venue.name,
        address: event.venue.address,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: event.venue.latitude,
          longitude: event.venue.longitude,
        },
      },
    ],
    image: event.images,
    description: event.description,
    offers: event.offers.map((offer) => {
      return {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        price: offer.price,
        priceCurrency: offer.currency,
        url: offer.url,
        validFrom: offer.validFrom,
        name: offer.name,
      };
    }),
    organizer: {
      '@type': 'Organization',
      name: event.venue.name,
    },
  } satisfies WithContext<MusicEvent>;
}

export class NextMetadataGenerator {
  public baseData: BaseData;
  constructor({ baseData }: { baseData: BaseData }) {
    this.baseData = baseData;
  }

  public generateMetadata<T>(additionalMetadata: T): T {
    const { icons, metadataBase, appLinks, keywords, twitter, openGraph } = this.baseData;
    const value = {
      ...additionalMetadata,
      icons,
      metadataBase,
      appLinks,
      // @ts-ignore
      keywords: [...keywords, ...(additionalMetadata.keywords ?? [])],
      twitter,
      openGraph: {
        siteName: openGraph?.siteName,
        // @ts-ignore
        ...additionalMetadata.openGraph,
      },
      locale: 'ko',
    } as T;

    return value;
  }

  public generateLdJson(
    params:
      | {
          type: 'WebSite';
          url: string;
          name: string;
        }
      | CustomMusicEvent
      | {
          type: 'Brand';
          name: string;
          image: string;
          logo: string;
          url: string;
          sameAs: string[];
        }
      | {
          type: 'Place';
          address: string;
          latitude: number;
          longitude: number;
          name: string;
          url: string;
          events: CustomMusicEvent[];
          description: string;
        }
      | {
          type: 'PerformingGroup';
          image: string;
          name: string;
          url: string;
          events: CustomMusicEvent[];
        }
      | {
          type: 'WebPageAbout';
          name: string;
          url: string;
          image: string;
          sameAs: string[];
          description: string;
        }
  ) {
    switch (params.type) {
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: params.url,
          name: params.name,
        } satisfies WithContext<WebSite>;
      case 'MusicEvent':
        return generateMusicEvent(params);
      case 'Brand':
        return {
          '@context': 'https://schema.org',
          '@type': 'Brand',
          name: params.name,
          image: params.image,
          logo: params.logo,
          url: params.url,
          sameAs: params.sameAs,
        } satisfies WithContext<Brand>;
      case 'Place':
        return {
          '@context': 'https://schema.org',
          '@type': 'Place',
          address: params.address,
          event: params.events.map((event) => generateMusicEvent(event)),
          geo: {
            '@type': 'GeoCoordinates',
            latitude: params.latitude,
            longitude: params.longitude,
          },
          name: params.name,
          url: params.url,
          description: params.description,
        } satisfies WithContext<Place>;
      case 'PerformingGroup':
        return {
          '@context': 'https://schema.org',
          '@type': 'PerformingGroup',
          image: params.image,
          name: params.name,
          url: params.url,
          event: params.events.map((event) => generateMusicEvent(event)),
        } satisfies WithContext<PerformingGroup>;
      case 'WebPageAbout':
        return {
          '@context': 'https://schema.org',
          name: params.name,
          '@type': 'AboutPage',
          url: params.url,
          image: params.image,
          sameAs: params.sameAs,
          description: params.description,
        } satisfies WithContext<WebPage>;
      default:
        return {};
    }
  }
}
