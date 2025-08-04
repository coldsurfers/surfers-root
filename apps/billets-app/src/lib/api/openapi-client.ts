import { ApiSdk } from '@coldsurfers/api-sdk';
import { createAuthMiddleware } from '@coldsurfers/openapi-client/native';
import { API_BASE_URL } from '../constants';
import { getQueryClient } from '../getQueryClient';

export const apiClient = new ApiSdk({
  baseUrl: API_BASE_URL,
})
  .addMiddlewares((apiClient) => {
    return [createAuthMiddleware(apiClient, getQueryClient())];
  })
  .createSdk();
