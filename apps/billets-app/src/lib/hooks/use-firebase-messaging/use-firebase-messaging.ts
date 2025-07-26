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
    const fcmToken = await messaging().getToken();
    return fcmToken;
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
