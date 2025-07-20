import { ApiSdk } from '@coldsurfers/api-sdk';
import type { Middleware } from 'openapi-fetch';
import { API_BASE_URL } from '../constants';
import getAccessToken from '../getAccessToken';

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return request;
  },
};

export const apiClient = new ApiSdk({
  baseUrl: API_BASE_URL,
}).createSdk({
  middlewares: [authMiddleware],
});
