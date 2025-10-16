import messaging from '@react-native-firebase/messaging';
import { useCallback, useEffect, useMemo } from 'react';
import type { TopicType } from './use-firebase-messaging.types';

export function useFirebaseMessaging() {
  const requestPermission = useCallback(async () => {
    const status = await messaging().requestPermission();
    return (
      status === messaging.AuthorizationStatus.PROVISIONAL ||
      status === messaging.AuthorizationStatus.AUTHORIZED
    );
  }, []);

  const getFCMToken = useCallback(async () => {
    try {
      const fcmToken = await messaging().getToken();
      return fcmToken;
    } catch (e) {
      // 시뮬레이터에서는 에러가 남
      console.error(e);
      return null;
    }
  }, []);

  const subscribeTopic = useCallback(async (topic: TopicType) => {
    await messaging().subscribeToTopic(topic);
  }, []);

  useEffect(() => {
    // foreground
    const unsubscribe = messaging().onMessage((message) => {
      console.log(message);
    });

    return () => unsubscribe();
  }, []);

  return useMemo(
    () => ({
      requestPermission,
      getFCMToken,
      subscribeTopic,
    }),
    [requestPermission, getFCMToken, subscribeTopic]
  );
}
