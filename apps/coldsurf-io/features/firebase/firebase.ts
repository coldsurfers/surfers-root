import { firebaseConfig } from '@/features/firebase/firebase.constants';
import type { FBLogEvent } from '@coldsurfers/shared-utils';
import { getAnalytics, isSupported, logEvent as logEventAnalytics } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';

let analytics: ReturnType<typeof getAnalytics> | null = null;

export function initializeFirebase() {
  if (process.env.NODE_ENV === 'production') {
    // 중복 초기화 방지
    const app = !getApps().length
      ? initializeApp({
          ...firebaseConfig,
        })
      : getApps()[0];

    // 브라우저 환경에서만 Analytics 초기화
    if (typeof window !== 'undefined') {
      isSupported()
        .then((supported) => {
          if (supported) {
            analytics = getAnalytics(app);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
}

export function logEvent(event: FBLogEvent) {
  if (!analytics) {
    return;
  }
  logEventAnalytics(analytics, event.name as string, event.params);
}
