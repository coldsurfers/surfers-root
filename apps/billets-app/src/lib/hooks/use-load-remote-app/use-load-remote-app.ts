import { apiClient } from '@/lib/api/openapi-client';
import { REMOTE_APPS, REMOTE_APP_BUNDLE_HOST_URL } from '@/lib/constants';
import { Script, ScriptManager } from '@callstack/repack/client';
import type { SettingsScreenProps } from '@coldsurfers/coldsurf-app-settings-app';
import { loadAsyncScript } from '@coldsurfers/react-native-esbuild-deploy';
import { useQuery } from '@tanstack/react-query';
import { type FC, useEffect, useMemo, useState } from 'react';
import { InteractionManager } from 'react-native';

const isDevMode = !__DEV__;

if (isDevMode) {
  ScriptManager.shared.addResolver(async (scriptId, caller) => {
    if (isDevMode) {
      return {
        url: Script.getDevServerURL(scriptId),
        cache: false,
      };
    }
  });
}

type RemoteAppRegistry = {
  type: 'settings';
  componentType: FC<SettingsScreenProps>;
};

type RemoteAppByType<T extends RemoteAppRegistry['type']> = Extract<RemoteAppRegistry, { type: T }>;

/**
 * RemoteApp의 componentName별 정확한 타입을 추출하는 유틸
 */
type RemoteAppComponentType<T extends RemoteAppRegistry['type']> =
  RemoteAppByType<T>['componentType'];

export const useLoadRemoteApp = <TApp extends RemoteAppRegistry['type']>(remoteApp: {
  appName: TApp;
}) => {
  const [remoteAppComponent, setRemoteAppComponent] = useState<RemoteAppComponentType<TApp> | null>(
    null
  );

  const { data: manifest, error: manifestError } = useQuery({
    queryKey: apiClient.app.queryKeys.remoteAppManifest,
    queryFn: () => apiClient.app.getRemoteAppManifest(),
  });

  const { data: remoteLoadedComponent, error: remoteLoadedComponentError } = useQuery({
    queryKey: ['remote-app', remoteApp],
    queryFn: async () => {
      if (isDevMode) {
        if (remoteApp.appName === 'settings') {
          const SettingsApp = await import('@coldsurfers/coldsurf-app-settings-app');
          return SettingsApp.default;
        }
        return null;
      }
      if (!manifest) return null;

      const { latestVersion } = manifest[remoteApp.appName];
      const path = `${REMOTE_APPS[remoteApp.appName].PATH}/v${latestVersion}/index.bundle.js`;

      try {
        const script = await loadAsyncScript<RemoteAppByType<TApp>['componentType']>({
          path,
          bundleHostUrl: REMOTE_APP_BUNDLE_HOST_URL,
        });

        return script;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    enabled: isDevMode ? true : !!manifest,
  });

  useEffect(() => {
    if (!remoteLoadedComponent) return;
    const task = InteractionManager.runAfterInteractions(async () => {
      setRemoteAppComponent(() => remoteLoadedComponent);
    });

    return () => task.cancel();
  }, [remoteLoadedComponent]);

  return useMemo(() => {
    return {
      component: remoteAppComponent,
      isError: !!manifestError || !!remoteLoadedComponentError,
    };
  }, [remoteAppComponent, manifestError, remoteLoadedComponentError]);
};
