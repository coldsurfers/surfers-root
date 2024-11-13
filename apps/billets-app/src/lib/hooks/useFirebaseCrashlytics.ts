import crashlytics from '@react-native-firebase/crashlytics'
import { useCallback, useMemo } from 'react'

function useFirebaseCrashlytics() {
  const enable = useCallback(async (enabled: boolean) => {
    await crashlytics().setCrashlyticsCollectionEnabled(enabled)
  }, [])

  return useMemo(
    () => ({
      enable,
    }),
    [enable],
  )
}

export default useFirebaseCrashlytics
