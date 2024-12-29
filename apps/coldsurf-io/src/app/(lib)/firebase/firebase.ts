// Import the functions you need from the SDKs you need
import { Analytics, getAnalytics } from 'firebase/analytics'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase.constants'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * only for client side
 */
export class Firebase {
  private analytics: Analytics
  private app: FirebaseApp

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig)
    this.analytics = getAnalytics(this.app)
  }

  static initializeApp() {
    const app = initializeApp(firebaseConfig)
    return getAnalytics(app)
  }
}
