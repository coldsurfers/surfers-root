import { AuthContextProvider, TabBarVisibleContextProvider, useFirebaseAnalytics, useFirebaseCrashlytics } from '@/lib'
import { CommonScreenLayout } from '@/ui'
import { Text } from '@coldsurfers/ocean-road/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import codePush, { DownloadProgress } from 'react-native-code-push'
import Config from 'react-native-config'
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
  return (
    <CommonScreenLayout>
      <Text>{JSON.stringify(progress)}</Text>
    </CommonScreenLayout>
  )
}

const BootSplashAwaiter = ({ children }: PropsWithChildren) => {
  const { enable: enableFirebaseAnalytics } = useFirebaseAnalytics()
  const { enable: enableFirebaseCrashlytics } = useFirebaseCrashlytics()
  const [progress, setProgress] = useState<DownloadProgress | null>(null)

  useEffect(() => {
    const init = async () => {
      await enableFirebaseAnalytics(true)
      await enableFirebaseCrashlytics(true)
    }

    init().finally(async () => {
      const update = await codePush.checkForUpdate(Config.CODE_PUSH_DEPLOYMENT_KEY)
      if (update) {
        update.download((progress) => {
          if (progress.receivedBytes === progress.totalBytes) {
            setProgress(null)
            codePush.sync({
              installMode: codePush.InstallMode.IMMEDIATE,
            })
            return
          }
          setProgress(progress)
          BootSplash.hide({ fade: true })
        })
      } else {
        BootSplash.hide({ fade: true })
      }
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
