import { AuthContextProvider, TabBarVisibleContextProvider, useFirebaseAnalytics, useFirebaseCrashlytics } from '@/lib'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren, useEffect } from 'react'
import { StatusBar } from 'react-native'
import BootSplash from 'react-native-bootsplash'
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

const BootSplashAwaiter = ({ children }: PropsWithChildren) => {
  const { enable: enableFirebaseAnalytics } = useFirebaseAnalytics()
  const { enable: enableFirebaseCrashlytics } = useFirebaseCrashlytics()

  useEffect(() => {
    const init = async () => {
      await enableFirebaseAnalytics(true)
      await enableFirebaseCrashlytics(true)
    }

    init().finally(async () => {
      await BootSplash.hide({ fade: true })
    })
  }, [enableFirebaseAnalytics, enableFirebaseCrashlytics])

  return <>{children}</>
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

export default App
