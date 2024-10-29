import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQueryClient} from '@tanstack/react-query';
import React, {createContext, PropsWithChildren, useCallback} from 'react';
import useGetMeQuery from '../hooks/queries/useGetMeQuery';
import {storageAuthTokenKey} from './constants';
import {components} from '../../types/api';

export type User = components['schemas']['GetMeSuccessResponse'] | null;

export const AuthContext = createContext<{
  login: ({}: {
    authToken: {
      refreshToken: string;
      accessToken: string;
    };
    user: User;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  user: User;
}>({
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  user: null,
});

export const AuthContextProvider = ({children}: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const {isLoading: isLoadingMe, data: meData, refetch} = useGetMeQuery();

  const login = useCallback(
    async ({
      authToken,
    }: {
      authToken: {
        refreshToken: string;
        accessToken: string;
      };
    }) => {
      try {
        await AsyncStorage.setItem(
          storageAuthTokenKey,
          JSON.stringify(authToken),
        );
        refetch();
      } catch (e) {
        console.error(e);
      }
    },
    [refetch],
  );
  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(storageAuthTokenKey);
      await queryClient.invalidateQueries({
        queryKey: useGetMeQuery.extractKey(),
      });
      refetch();
    } catch (e) {
      console.error(e);
    }
  }, [queryClient, refetch]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading: isLoadingMe,
        user: meData ?? null,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
