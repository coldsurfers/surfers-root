import type { AuthToken } from 'src/__generated__/graphql';
import storage from './storage/storage';

export const authUtils = {
  localLogin: async (authToken: AuthToken) => {
    await fetch('/api/local-login', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: authToken.accessToken,
        refreshToken: authToken.refreshToken,
      }),
    });
    storage?.set('@wamuseum-client/access-token', authToken.accessToken);
    storage?.set('@wamuseum-client/refresh-token', authToken.refreshToken);
  },
  localLogout: async () => {
    await fetch('/api/local-logout', {
      method: 'POST',
    });
    storage?.remove('@wamuseum-client/access-token');
    storage?.remove('@wamuseum-client/refresh-token');
  },
  tokenRefresh: (authToken: AuthToken) => {
    storage?.set('@wamuseum-client/access-token', authToken.accessToken);
    storage?.set('@wamuseum-client/refresh-token', authToken.refreshToken);
  },
};
