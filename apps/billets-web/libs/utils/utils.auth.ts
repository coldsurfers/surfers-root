import type { components } from '@coldsurfers/api-sdk';
import { SITE_URL } from '../constants';
import { useAuthStore } from '../stores';

export const authUtils = {
  localLogin: async (
    authToken: components['schemas']['UserWithAuthTokenDTOSchema']['authToken']
  ) => {
    const isSsr = typeof window === 'undefined';
    const fetchUrl = isSsr ? `${SITE_URL}/api/local-login` : '/api/local-login';
    await fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify({
        accessToken: authToken.accessToken,
        refreshToken: authToken.refreshToken,
      }),
    });
    if (!isSsr) {
      useAuthStore.getState().login({
        accessToken: authToken.accessToken,
        refreshToken: authToken.refreshToken,
      });
    }
  },
  localLogout: async () => {
    const isSsr = typeof window === 'undefined';
    const fetchUrl = isSsr ? `${SITE_URL}/api/local-logout` : '/api/local-logout';
    await fetch(fetchUrl, {
      method: 'POST',
    });
    if (!isSsr) {
      useAuthStore.getState().logout();
    }
  },
};
