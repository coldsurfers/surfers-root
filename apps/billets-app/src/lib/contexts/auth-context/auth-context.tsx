import { apiClient } from '@/lib/api/openapi-client';
import { useFirebaseAnalytics, useFirebaseMessaging } from '@/lib/hooks';
import { mmkvKeys } from '@/lib/storage/constants';
import { mmkvInstance } from '@/lib/storage/mmkvInstance';
import type { LoginProvider } from '@/types/auth';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { createContext, type PropsWithChildren, useCallback } from 'react';
import type { components } from '../../../types/api';

export type User = components['schemas']['UserDTOSchema'] | null;
type LoginActionParams = {
  authToken: {
    refreshToken: string;
    accessToken: string;
  };
  user: User;
  analyticsOptions: {
    provider: LoginProvider;
  };
};
export const AuthContext = createContext<{
  login: (params: LoginActionParams) => Promise<void>;
  logout: () => Promise<void>;
}>({
  login: async () => {},
  logout: async () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { mutateAsync: mutateSaveFcmTokenAsync } = useMutation<
    components['schemas']['FCMTokenDTOSchema'],
    OpenApiError,
    string
  >({
    mutationFn: (fcmToken) => apiClient.fcm.saveFcmToken(fcmToken),
  });
  const { getFCMToken } = useFirebaseMessaging();
  const { logEvent } = useFirebaseAnalytics();

  const login = useCallback(
    async ({ authToken, analyticsOptions, user }: LoginActionParams) => {
      try {
        mmkvInstance.set(mmkvKeys.authToken, JSON.stringify(authToken));
        const fcmToken = await getFCMToken();
        await mutateSaveFcmTokenAsync(fcmToken);
        await queryClient.resetQueries();
        logEvent({
          name: 'login',
          params: {
            provider: analyticsOptions.provider,
            user_id: user?.id ?? '',
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    [getFCMToken, logEvent, queryClient, mutateSaveFcmTokenAsync]
  );
  const logout = useCallback(async () => {
    try {
      mmkvInstance.delete(mmkvKeys.authToken);
      await queryClient.resetQueries();
      logEvent({
        name: 'logout',
        params: {},
      });
    } catch (e) {
      console.error(e);
    }
  }, [logEvent, queryClient]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
