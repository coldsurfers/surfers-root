import { AuthContextProvider, useFirebaseAnalytics, useFirebaseCrashlytics } from '@/lib'
import { apiClient } from '@/lib/api/openapi-client'
import { GlobalErrorBoundaryRegistry } from '@/lib/errors'
import { useColorSchemeStorage } from '@/lib/storage'
import { compareVersion } from '@/lib/utils.semver'
import { CommonScreenLayout } from '@/ui'
import { BackgroundOtaUpdater } from '@/ui/background-ota-updater'
import { ForceUpdateDialog } from '@/ui/force-update-dialog'
import { GlobalSuspenseFallback } from '@/ui/global-suspense-fallback'
import { colors, ColorScheme } from '@coldsurfers/ocean-road'
import { ColorSchemeProvider, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { HotUpdater } from '@hot-updater/react-native'
import { LogLevel, PerformanceProfiler, RenderPassReport } from '@shopify/react-native-performance'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import React, { memo, PropsWithChildren, Suspense, useCallback, useEffect, useMemo } from 'react'
import { Platform, useColorScheme as rnUseColorScheme, StatusBar, View } from 'react-native'
import Config from 'react-native-config'
import { getVersion } from 'react-native-device-info'
import FastImage from 'react-native-fast-image'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { match } from 'ts-pattern'
import pkg from './package.json'
import AppContainer from './src/AppContainer'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
})

const AppSystemColorSwitcher = memo(() => {
  const { colorScheme, setColorScheme } = useColorScheme()
  const systemColorScheme = rnUseColorScheme()
  const [storageColorSchemeValue] = useColorSchemeStorage()

  useEffect(() => {
    if (storageColorSchemeValue) {
      return
    }
    setColorScheme(systemColorScheme ?? 'light')
  }, [setColorScheme, storageColorSchemeValue, systemColorScheme])

  return <StatusBar translucent barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
})

const HotUpdaterUpdateScreen = ({ progress }: { progress: number }) => {
  const percentage = progress * 100
  return (
    <SafeAreaProvider>
      <CommonScreenLayout style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 }}>
        <FastImage
          source={require('assets/bootsplash/logo.png')}
          style={{
            width: 124,
            height: 124,
            borderRadius: 124 / 2,
          }}
        />
        <View style={{ marginTop: 36, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '100%', backgroundColor: colors.oc.white.value, height: 24, borderRadius: 8 }}>
            <View
              style={{
                width: `${percentage}%`,
                backgroundColor: colors.oc.indigo[8].value,
                height: '100%',
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ marginTop: 24 }}>
            <Text weight="medium" style={{ fontSize: 18 }}>
              {percentage}
            </Text>
          </View>
        </View>
      </CommonScreenLayout>
    </SafeAreaProvider>
  )
}

const BootSplashAwaiter = ({ children }: PropsWithChildren) => {
  const { enable: enableFirebaseAnalytics } = useFirebaseAnalytics()
  const { enable: enableFirebaseCrashlytics } = useFirebaseCrashlytics()
  const { data: appUpdateInfoData, isLoading: isAppUpdateInfoLoading } = useQuery({
    queryKey: apiClient.app.queryKeys.updateInfo,
    queryFn: () => apiClient.app.getAppUpdateInfo(),
  })

  const updateInfo = useMemo<
    | {
        shouldForceUpdate: true
        updateType: 'native' | 'ota'
      }
    | {
        shouldForceUpdate: false
      }
  >(() => {
    if (!appUpdateInfoData) {
      return {
        shouldForceUpdate: false,
      }
    }
    const platform = Platform.select({
      ios: 'ios',
      android: 'android',
      default: 'android',
    }) as 'ios' | 'android'

    const targetUpdateInfo = appUpdateInfoData[platform]
    if (!targetUpdateInfo) {
      return {
        shouldForceUpdate: false,
      }
    }

    const { forceUpdate, latestVersion, updateType } = targetUpdateInfo
    // check pkg version
    const nativeVersion = getVersion()
    const shouldForceUpdate = match(updateType)
      .with('native', () => {
        return forceUpdate && compareVersion(nativeVersion, latestVersion) < 0
      })
      .with('ota', () => {
        return forceUpdate && compareVersion(pkg.version, latestVersion) < 0
      })
      .exhaustive()
    if (shouldForceUpdate) {
      return {
        shouldForceUpdate: true,
        updateType,
      }
    }
    return {
      shouldForceUpdate: false,
    }
  }, [appUpdateInfoData])

  useEffect(() => {
    const enableFirebase = async () => {
      await Promise.all([enableFirebaseAnalytics(!__DEV__), enableFirebaseCrashlytics(!__DEV__)])
    }

    enableFirebase()
  }, [enableFirebaseAnalytics, enableFirebaseCrashlytics])

  const isLoading = isAppUpdateInfoLoading

  if (isLoading) {
    return <GlobalSuspenseFallback />
  }

  return (
    <>
      {updateInfo.shouldForceUpdate ? (
        <ForceUpdateDialog updateType={updateInfo.updateType} />
      ) : (
        <>
          {children}
          <BackgroundOtaUpdater />
        </>
      )}
    </>
  )
}

const App = () => {
  const systemColorScheme = rnUseColorScheme()
  const [storageColorSchemeValue] = useColorSchemeStorage()

  const initialColorScheme: ColorScheme = useMemo(() => {
    if (storageColorSchemeValue) {
      return storageColorSchemeValue as 'light' | 'dark'
    }
    console.log('systemColorScheme', systemColorScheme)
    return systemColorScheme ?? 'light'
  }, [storageColorSchemeValue, systemColorScheme])

  const onReportPrepared = useCallback((report: RenderPassReport) => {
    console.log('render report', report)
    // monorail.produce(convertReportToMonorailObject(report));
  }, [])

  const errorHandler = useCallback((error: Error) => {
    console.error(error)
  }, [])

  return (
    <PerformanceProfiler
      onReportPrepared={onReportPrepared}
      errorHandler={errorHandler}
      logLevel={LogLevel.Debug}
      enabled={__DEV__}
    >
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
    </PerformanceProfiler>
  )
}

export default HotUpdater.wrap({
  source: `${Config.HOT_UPDATER_SUPABASE_URL!}/functions/v1/update-server`,
  fallbackComponent: ({ status, progress }) => status === 'UPDATING' && <HotUpdaterUpdateScreen progress={progress} />,
})(App)
