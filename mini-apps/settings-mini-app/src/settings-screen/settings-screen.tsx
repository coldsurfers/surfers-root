import { CommonScreenLayout } from '@coldsurfers/ocean-road-extension/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SettingsMenuList } from '../settings-menu-list';
import type { SettingsScreenProps } from '../types';
import { useSettingsScreenNavigation } from './settings-screen.hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const SettingsScreen = ({ pkgVersion, onLogout }: SettingsScreenProps) => {
  const navigation = useSettingsScreenNavigation();
  const onLogoutSuccess = useCallback(() => {
    navigation.navigate('MainTabNavigation', {
      screen: 'HomeStackNavigation',
      params: {
        screen: 'HomeScreen',
        params: {},
      },
    });
  }, [navigation]);
  return (
    <QueryClientProvider client={queryClient}>
      <CommonScreenLayout>
        <SettingsMenuList
          pkgVersion={pkgVersion}
          logout={onLogout}
          onLogoutSuccess={onLogoutSuccess}
        />
      </CommonScreenLayout>
    </QueryClientProvider>
  );
};
