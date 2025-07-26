import { apiClient } from '@/lib/api/openapi-client';
import { REMOTE_APPS, REMOTE_APP_BUNDLE_HOST_URL } from '@/lib/constants';
import { loadAsyncScript } from '@coldsurfers/react-native-esbuild-deploy';
import { useQuery } from '@tanstack/react-query';
import { type FC, useEffect, useMemo, useState } from 'react';
import type { TextProps } from 'react-native';

type RemoteAppRegistry = {
  type: 'settings';
  components: {
    VersionText: FC<TextProps>;
  };
};

type RemoteAppByType<T extends RemoteAppRegistry['type']> = Extract<RemoteAppRegistry, { type: T }>;

export const useLoadRemoteApp = (remoteApp: {
  appName: 'settings';
  componentName: 'VersionText';
}) => {
  const [remoteAppComponent, setRemoteAppComponent] = useState<
    RemoteAppByType<typeof remoteApp.appName>['components'][typeof remoteApp.componentName] | null
  >(null);
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
      if (!manifest) {
        return null;
      }
      const { latestVersion } = manifest[remoteApp.appName];
      const path = `${REMOTE_APPS[remoteApp.appName].PATH}/v${latestVersion}/index.bundle.js`;
      const script = await loadAsyncScript<RemoteAppByType<typeof remoteApp.appName>['components']>(
        {
          path,
          bundleHostUrl: REMOTE_APP_BUNDLE_HOST_URL,
        }
      );
      return script[remoteApp.componentName];
    },
    enabled: !!manifest,
  });

  useEffect(() => {
    if (!remoteLoadedComponent) {
      return;
    }
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
