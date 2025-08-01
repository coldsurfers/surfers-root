import { apiClient } from '@/lib/api/openapi-client';
import { REMOTE_APPS, REMOTE_APP_BUNDLE_HOST_URL } from '@/lib/constants';
import type { MenuItemProps } from '@coldsurfers/coldsurf-app-settings-app';
import { loadAsyncScript } from '@coldsurfers/react-native-esbuild-deploy';
import { useQuery } from '@tanstack/react-query';
import { type FC, useEffect, useMemo, useState } from 'react';
import type { TextProps } from 'react-native';

type RemoteAppRegistry = {
  type: 'settings';
  components: {
    VersionText: FC<TextProps>;
    MenuItem: FC<MenuItemProps>;
  };
};

type RemoteAppByType<T extends RemoteAppRegistry['type']> = Extract<RemoteAppRegistry, { type: T }>;

/**
 * RemoteApp의 componentName별 정확한 타입을 추출하는 유틸
 */
type RemoteAppComponentType<
  T extends RemoteAppRegistry['type'],
  C extends keyof RemoteAppByType<T>['components'],
> = RemoteAppByType<T>['components'][C];
export const useLoadRemoteApp = <
  TApp extends RemoteAppRegistry['type'],
  C extends keyof RemoteAppByType<TApp>['components'],
>(remoteApp: {
  appName: TApp;
  componentName: C;
}) => {
  const [remoteAppComponent, setRemoteAppComponent] = useState<RemoteAppComponentType<
    TApp,
    C
  > | null>(null);

  const {
    data: manifest,
    isLoading: isLoadingManifest,
    error: manifestError,
  } = useQuery({
    queryKey: apiClient.app.queryKeys.remoteAppManifest,
    queryFn: () => apiClient.app.getRemoteAppManifest(),
  });

  const {
    data: remoteLoadedComponent,
    isLoading: isLoadingRemoteLoadedComponent,
    error: remoteLoadedComponentError,
  } = useQuery({
    queryKey: ['remote-app', remoteApp],
    queryFn: async () => {
      // if (__DEV__) {
      //   if (remoteApp.appName === 'settings') {
      //     const settingsApp = (await import('@coldsurfers/coldsurf-app-settings-app')).default;

      //     console.log('settingsApp', settingsApp);

      //     return settingsApp[
      //       remoteApp.componentName as keyof typeof settingsApp
      //     ] as RemoteAppComponentType<TApp, C>;
      //   }
      //   return null;
      // }
      if (!manifest) return null;

      const { latestVersion } = manifest[remoteApp.appName];
      const path = `${REMOTE_APPS[remoteApp.appName].PATH}/v${latestVersion}/index.bundle.js`;

      const script = await loadAsyncScript<RemoteAppByType<TApp>['components']>({
        path,
        bundleHostUrl: REMOTE_APP_BUNDLE_HOST_URL,
      });

      return script[remoteApp.componentName];
    },
    // enabled: __DEV__ ? true : !!manifest,
    enabled: !!manifest,
  });

  useEffect(() => {
    if (!remoteLoadedComponent) return;
    setRemoteAppComponent(() => remoteLoadedComponent);
  }, [remoteLoadedComponent]);

  return useMemo(() => {
    return {
      isLoading: isLoadingManifest || isLoadingRemoteLoadedComponent,
      component: remoteAppComponent,
      isError: !!manifestError || !!remoteLoadedComponentError,
    };
  }, [
    isLoadingManifest,
    isLoadingRemoteLoadedComponent,
    remoteAppComponent,
    manifestError,
    remoteLoadedComponentError,
  ]);
};
