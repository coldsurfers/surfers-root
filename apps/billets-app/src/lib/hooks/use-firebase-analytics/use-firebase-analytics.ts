import analytics from '@react-native-firebase/analytics';
import { useCallback, useMemo } from 'react';
import type { FBLogEvent } from './use-firebase-analytics.types';

export function useFirebaseAnalytics() {
  const enable = useCallback(async (enabled: boolean) => {
    await analytics().setAnalyticsCollectionEnabled(enabled);
  }, []);

  const logEvent = useCallback((event: FBLogEvent) => {
    analytics().logEvent(event.name, event.params);
  }, []);

  const logScreenView = useCallback(
    async ({ screen_class, screen_name }: { screen_class: string; screen_name: string }) => {
      await analytics().logScreenView({
        screen_name,
        screen_class,
      });
    },
    []
  );

  return useMemo(
    () => ({
      enable,
      logEvent,
      logScreenView,
    }),
    [enable, logEvent, logScreenView]
  );
}
