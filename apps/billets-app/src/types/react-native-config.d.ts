declare module 'react-native-config' {
  export interface NativeConfig {
    PLATFORM?: 'development' | 'production' | 'staging'
    GOOGLE_SIGNIN_WEB_CLIENT_ID?: string
    GOOGLE_SIGNIN_WEB_IOS_CLIENT_ID?: string
    ANDROID_GOOGLE_MAPS_API_KEY?: string
    CODE_PUSH_DEPLOYMENT_KEY?: string
  }

  export const Config: NativeConfig
  export default Config
}
