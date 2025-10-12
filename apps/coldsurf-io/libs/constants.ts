import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import pkg from '../package.json';

export const API_BASE_URL = (() => {
  switch (process.env.APP_PLATFORM) {
    case 'production':
      return 'https://api.billets.coldsurf.io';
    case 'staging':
      return 'https://dev.api.billets.coldsurf.io';
    default:
      return 'http://localhost:3001';
  }
})();

export const SITE_URL = (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  return process.env.SITE_URL ?? 'https://coldsurf.io';
})();
export const SITE_MAP_URL = `${SITE_URL}/sitemap.xml`;
export const COMMON_META_TITLE = `${SERVICE_NAME} | Alternative is the New Mainstream. 공연에서 타투까지, 예술의 흐름을 잇다.`;
export const COMMON_META_DESCRIPTION = `${SERVICE_NAME}는 공연·타투·예술을 잇는 다방면 문화예술 플랫폼입니다. Alternative is the new mainstream. 예술과 서브컬처가 만나는 새로운 무대를 만듭니다.`;
export const COMMON_OG_DESCRIPTION =
  '주류를 넘어, 새로운 문화의 흐름을 만듭니다. COLDSURF - 공연에서 타투까지, 예술의 흐름을 잇다.';
export const PRIVATE_BLOG_SERVICE_NAME = '주인장의 소회';

export const APP_STORE_ID = '1632802589';
export const APP_STORE_URL = `https://itunes.apple.com/app/id${APP_STORE_ID}`;

export const GLOBAL_TIME_ZONE = 'Asia/Seoul';

export const GLOBAL_Z_INDEX = {
  APP_HEADER: 99,
  MOBILE_MENU_MODAL: 1000,
  LOGIN_MODAL: 1001,
};

export const APP_DOWNLOAD_WORDING = '앱 다운로드';
export const COOKIE_ACCESS_TOKEN_KEY = '@coldsurf-io/cookie-access-token';
export const COOKIE_REFRESH_TOKEN_KEY = '@coldsurf-io/cookie-refresh-token';
export const COOKIE_THEME = '@coldsurf-io/cookie-theme';

export const FEATURE_FLAGS = pkg.featureFlags;

export const SNS_LINKS = {
  INSTAGRAM: 'https://www.instagram.com/coldsurf.io',
  X: 'https://x.com/coldsurf_io',
} as const;
