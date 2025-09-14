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
  switch (process.env.APP_PLATFORM) {
    case 'production':
      return 'https://coldsurf.io';
    case 'staging':
      return 'https://staging.coldsurf.io';
    default:
      return 'http://localhost:3000';
  }
})();
export const SITE_MAP_URL = 'https://coldsurf.io/sitemap.xml';
export const COMMON_META_TITLE = `${SERVICE_NAME} - 당신 근처의 공연, 예술, 사운드`;
export const COMMON_META_DESCRIPTION = '지금 이 순간, 당신 근처에서 벌어지는 공연들';

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
