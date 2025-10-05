import { NextMetadataGenerator, SERVICE_NAME } from '@coldsurfers/shared-utils';
import { APP_STORE_ID, APP_STORE_URL, SITE_URL } from '../constants';

export const metadataInstance = new NextMetadataGenerator({
  baseData: {
    keywords: [
      SERVICE_NAME,
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
    },
  },
});
