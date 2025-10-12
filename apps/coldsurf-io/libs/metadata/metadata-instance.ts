import { NextMetadataGenerator, SERVICE_NAME } from '@coldsurfers/shared-utils';
import {
  APP_STORE_ID,
  APP_STORE_URL,
  COMMON_META_TITLE,
  COMMON_OG_DESCRIPTION,
  SITE_URL,
} from '../constants';

export const metadataInstance = new NextMetadataGenerator({
  baseData: {
    keywords: [
      '공연',
      '타투',
      '예술',
      '문화예술 플랫폼',
      '대체문화',
      '서브컬처',
      '인디',
      'underground',
      'alternative',
      'artist',
      'tattoo',
      'concert',
      'art scene',
      'cultural support',
      'indie artist',
    ],
    icons: {
      icon: '/icons/favicon.ico',
      shortcut: '/icons/favicon.ico',
      apple: '/icons/favicon.ico',
    },
    metadataBase: new URL(SITE_URL),
    appLinks: {
      ios: {
        app_name: SERVICE_NAME,
        app_store_id: APP_STORE_ID,
        url: APP_STORE_URL,
      },
    },
    openGraph: {
      siteName: SERVICE_NAME,
      title: COMMON_META_TITLE,
      description: COMMON_OG_DESCRIPTION,
    },
  },
});
