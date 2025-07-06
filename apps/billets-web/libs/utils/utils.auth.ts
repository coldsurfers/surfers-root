import type { components } from '@coldsurfers/api-sdk';
import { useAuthStore } from '../stores';

export const authUtils = {
  localLogin: async (
    authToken: components['schemas']['UserWithAuthTokenDTOSchema']['authToken']
  ) => {
    await fetch('/api/local-login', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: authToken.accessToken,
        refreshToken: authToken.refreshToken,
      }),
    });
    useAuthStore.getState().login({
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
    });
  },
  localLogout: async () => {
    await fetch('/api/local-logout', {
      method: 'POST',
    });
    useAuthStore.getState().logout();
  },
};
