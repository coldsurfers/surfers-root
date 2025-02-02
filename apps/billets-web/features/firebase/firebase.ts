import { Analytics, getAnalytics } from 'firebase/analytics'
import { FirebaseApp, initializeApp as fbInitializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase.constants'

/**
 * only for client side
 */
export class Firebase {
  private analytics: Analytics
  private app: FirebaseApp

  constructor() {
    // Initialize Firebase
    this.app = fbInitializeApp(firebaseConfig)
    this.analytics = getAnalytics(this.app)
  }

  static initializeApp() {
    if (process.env.APP_PLATFORM !== 'production') {
      return
    }
    const app = fbInitializeApp(firebaseConfig)
    return getAnalytics(app)
  }
}
