declare module 'react-native-config' {
  export interface NativeConfig {
    PLATFORM?: 'development' | 'production' | 'staging'
    GOOGLE_SIGNIN_WEB_CLIENT_ID?: string
    GOOGLE_SIGNIN_WEB_IOS_CLIENT_ID?: string
    ANDROID_GOOGLE_MAPS_API_KEY?: string
    IOS_CODE_PUSH_DEPLOYMENT_KEY?: string
    ANDROID_CODE_PUSH_DEPLOYMENT_KEY?: string
    GOOGLE_MOBILE_ADS_ANDROID_APP_ID?: string
    GOOGLE_MOBILE_ADS_IOS_APP_ID?: string
    GOOGLE_MOBILE_ADS_IOS_INTERSTITIAL_ID?: string
    GOOGLE_MOBILE_ADS_ANDROID_INTERSTITIAL_ID?: string
  }

  export const Config: NativeConfig
  export default Config
}
