import { AuthContextProvider, useFirebaseAnalytics, useFirebaseCrashlytics } from '@/lib'
import { GlobalErrorBoundaryRegistry } from '@/lib/errors'
import { useColorSchemeStorage } from '@/lib/storage'
import { CommonScreenLayout } from '@/ui'
import { colors, ColorScheme } from '@coldsurfers/ocean-road'
import { ColorSchemeProvider, Spinner, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { HotUpdater } from '@hot-updater/react-native'
import { LogLevel, PerformanceProfiler, RenderPassReport } from '@shopify/react-native-performance'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { memo, PropsWithChildren, Suspense, useCallback, useEffect, useMemo } from 'react'
import { useColorScheme as rnUseColorScheme, StatusBar, View } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import Config from 'react-native-config'
import FastImage from 'react-native-fast-image'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
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

  useEffect(() => {
    const init = async () => {
      try {
        await enableFirebaseAnalytics(!__DEV__)
        await enableFirebaseCrashlytics(!__DEV__)
      } catch (e) {
        console.error(e)
      } finally {
        BootSplash.hide({ fade: true })
      }
    }
    init()
  }, [enableFirebaseAnalytics, enableFirebaseCrashlytics])

  return <>{children}</>
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
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </PerformanceProfiler>
  )
}

const GlobalSuspenseFallback = () => {
  const { semantics } = useColorScheme()

  return (
    <View style={{ flex: 1, backgroundColor: semantics.background[3], alignItems: 'center', justifyContent: 'center' }}>
      <Spinner />
    </View>
  )
}

export default HotUpdater.wrap({
  source: Config.HOT_UPDATER_SUPABASE_URL ?? '',
  fallbackComponent: ({ status, progress }) => <HotUpdaterUpdateScreen progress={progress} />,
})(App)
