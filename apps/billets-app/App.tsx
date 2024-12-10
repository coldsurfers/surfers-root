import { AuthContextProvider, TabBarVisibleContextProvider, useFirebaseAnalytics, useFirebaseCrashlytics } from '@/lib'
import { CommonScreenLayout } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { StatusBar, View } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import codePush, { DownloadProgress } from 'react-native-code-push'
import Config from 'react-native-config'
import FastImage from 'react-native-fast-image'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
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

const CodepushUpdateScreen = ({ progress }: { progress: DownloadProgress }) => {
  const percentage = `${(progress.receivedBytes / progress.totalBytes) * 100}%`
  return (
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
              width: `${(progress.receivedBytes / progress.totalBytes) * 100}%`,
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
  )
}

const BootSplashAwaiter = ({ children }: PropsWithChildren) => {
  const { enable: enableFirebaseAnalytics } = useFirebaseAnalytics()
  const { enable: enableFirebaseCrashlytics } = useFirebaseCrashlytics()
  const [progress, setProgress] = useState<DownloadProgress | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        await enableFirebaseAnalytics(true)
        await enableFirebaseCrashlytics(true)
      } catch (e) {
        console.error('Error enabling Firebase services:', e)
      }
    }

    const handleCodepushUpdate = async () => {
      try {
        await codePush.sync(
          {
            installMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey: Config.CODE_PUSH_DEPLOYMENT_KEY,
          },
          (status) => {
            if (status === codePush.SyncStatus.UP_TO_DATE || status === codePush.SyncStatus.UPDATE_INSTALLED) {
              setProgress(null)
            }
          },
          (progress) => {
            setProgress(progress)
          },
        )
      } catch (e) {
        console.error('CodePush update error:', e)
      }
      BootSplash.hide({ fade: true })
    }

    init().finally(() => {
      handleCodepushUpdate()
    })
  }, [enableFirebaseAnalytics, enableFirebaseCrashlytics])

  return <>{progress ? <CodepushUpdateScreen progress={progress} /> : children}</>
}

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TabBarVisibleContextProvider>
        <StatusBar translucent barStyle="dark-content" />
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <BootSplashAwaiter>
              <AppContainer />
            </BootSplashAwaiter>
          </AuthContextProvider>
        </QueryClientProvider>
      </TabBarVisibleContextProvider>
    </GestureHandlerRootView>
  )
}

export default codePush(App)
