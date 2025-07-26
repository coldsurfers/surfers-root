import { AuthContextProvider, useFirebaseAnalytics, useFirebaseCrashlytics } from '@/lib';
import { apiClient } from '@/lib/api/openapi-client';
import { GlobalErrorBoundaryRegistry } from '@/lib/errors';
import { getQueryClient } from '@/lib/getQueryClient';
import { useColorSchemeStorage } from '@/lib/storage';
import { compareVersion } from '@/lib/utils.semver';
import { BackgroundOtaUpdater } from '@/ui/background-ota-updater';
import { ForceUpdateDialog } from '@/ui/force-update-dialog';
import { GlobalSuspenseFallback } from '@/ui/global-suspense-fallback';
import type { ColorScheme } from '@coldsurfers/ocean-road';
import { ColorSchemeProvider, useColorScheme } from '@coldsurfers/ocean-road/native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, { Suspense, memo, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { Platform, StatusBar, useColorScheme as rnUseColorScheme } from 'react-native';
import { getVersion } from 'react-native-device-info';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { match } from 'ts-pattern';
import pkg from './package.json';
import AppContainer from './src/AppContainer';

const queryClient = getQueryClient();

const AppSystemColorSwitcher = memo(() => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const systemColorScheme = rnUseColorScheme();
  const [storageColorSchemeValue] = useColorSchemeStorage();

  useEffect(() => {
    if (storageColorSchemeValue) {
      return;
    }
    setColorScheme(systemColorScheme ?? 'light');
  }, [setColorScheme, storageColorSchemeValue, systemColorScheme]);

  return (
    <StatusBar translucent barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
  );
});

const BootSplashAwaiter = ({ children }: PropsWithChildren) => {
  const { enable: enableFirebaseAnalytics } = useFirebaseAnalytics();
  const { enable: enableFirebaseCrashlytics } = useFirebaseCrashlytics();
  const { data: appUpdateInfoData, isLoading: isAppUpdateInfoLoading } = useQuery({
    queryKey: apiClient.app.queryKeys.updateInfo,
    queryFn: () => apiClient.app.getAppUpdateInfo(),
  });

  const [notSyncedWithServer, setNotSyncedWithServer] = useState(false);

  const updateInfo = useMemo<
    | {
        shouldForceUpdate: true;
        updateType: 'native' | 'ota';
      }
    | {
        shouldForceUpdate: false;
      }
  >(() => {
    if (!appUpdateInfoData) {
      return {
        shouldForceUpdate: false,
      };
    }
    const platform = Platform.select({
      ios: 'ios',
      android: 'android',
      default: 'android',
    }) as 'ios' | 'android';

    const targetUpdateInfo = appUpdateInfoData[platform];
    if (!targetUpdateInfo) {
      return {
        shouldForceUpdate: false,
      };
    }

    const { forceUpdate, latestVersion, updateType } = targetUpdateInfo;
    // check pkg version
    const nativeVersion = getVersion();
    const shouldForceUpdate = match(updateType)
      .with('native', () => {
        return forceUpdate && compareVersion(nativeVersion, latestVersion) < 0;
      })
      .with('ota', () => {
        return forceUpdate && compareVersion(pkg.version, latestVersion) < 0;
      })
      .exhaustive();
    if (shouldForceUpdate) {
      return {
        shouldForceUpdate: true,
        updateType,
      };
    }
    return {
      shouldForceUpdate: false,
    };
  }, [appUpdateInfoData]);

  useEffect(() => {
    const enableFirebase = async () => {
      await Promise.all([enableFirebaseAnalytics(!__DEV__), enableFirebaseCrashlytics(!__DEV__)]);
    };

    enableFirebase();
  }, [enableFirebaseAnalytics, enableFirebaseCrashlytics]);

  const isLoading = isAppUpdateInfoLoading;

  if (isLoading) {
    return <GlobalSuspenseFallback />;
  }

  if (notSyncedWithServer) {
    return (
      <>
        {children}
        <BackgroundOtaUpdater />
      </>
    );
  }

  return (
    <>
      {updateInfo.shouldForceUpdate ? (
        <ForceUpdateDialog
          updateType={updateInfo.updateType}
          onNothing={() => setNotSyncedWithServer(true)}
        />
      ) : (
        <>
          {children}
          <BackgroundOtaUpdater />
        </>
      )}
    </>
  );
};

const App = () => {
  const systemColorScheme = rnUseColorScheme();
  const [storageColorSchemeValue] = useColorSchemeStorage();

  const initialColorScheme: ColorScheme = useMemo(() => {
    if (storageColorSchemeValue) {
      return storageColorSchemeValue as 'light' | 'dark';
    }
    console.log('systemColorScheme', systemColorScheme);
    return systemColorScheme ?? 'light';
  }, [storageColorSchemeValue, systemColorScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorSchemeProvider initialColorScheme={initialColorScheme}>
        <GlobalErrorBoundaryRegistry>
          <AppSystemColorSwitcher />
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<GlobalSuspenseFallback />}>
              <AuthContextProvider>
                <BootSplashAwaiter>
                  <AppContainer />
                </BootSplashAwaiter>
              </AuthContextProvider>
            </Suspense>
          </QueryClientProvider>
        </GlobalErrorBoundaryRegistry>
      </ColorSchemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
