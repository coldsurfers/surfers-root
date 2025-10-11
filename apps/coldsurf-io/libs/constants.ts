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
export const COMMON_META_TITLE = `${SERVICE_NAME} - 다방면 문화 예술 서포트 플랫폼`;
export const COMMON_META_DESCRIPTION =
  '문화 예술에 목마른 이를 위한 다방면 문화예술 서포트 플랫폼, COLDSURF';

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
