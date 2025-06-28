// Import the functions you need from the SDKs you need
import { type Analytics, getAnalytics } from 'firebase/analytics';
import { type FirebaseApp, initializeApp as fbInitializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * only for client side
 */
export class Firebase {
  private analytics: Analytics;
  private app: FirebaseApp;

  constructor() {
    // Initialize Firebase
    this.app = fbInitializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
  }

  static initializeApp() {
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    const app = fbInitializeApp(firebaseConfig);
    return getAnalytics(app);
  }
}
