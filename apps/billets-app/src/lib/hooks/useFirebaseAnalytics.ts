import analytics from '@react-native-firebase/analytics'
import { useCallback, useMemo } from 'react'

function useFirebaseAnalytics() {
  const enable = useCallback(async (enabled: boolean) => {
    await analytics().setAnalyticsCollectionEnabled(enabled)
  }, [])

  const logEvent = useCallback((name: string, params?: { [key: string]: unknown }) => {
    analytics().logEvent(name, params)
  }, [])

  const logScreenView = useCallback(
    async ({ screen_class, screen_name }: { screen_class: string; screen_name: string }) => {
      await analytics().logScreenView({
        screen_name,
        screen_class,
      })
    },
    [],
  )

  return useMemo(
    () => ({
      enable,
      logEvent,
      logScreenView,
    }),
    [enable, logEvent, logScreenView],
  )
}

export default useFirebaseAnalytics
