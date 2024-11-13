declare module 'react-native-config' {
  export interface NativeConfig {
    PLATFORM?: 'development' | 'production'
    GOOGLE_SIGNIN_WEB_CLIENT_ID?: string
    GOOGLE_SIGNIN_WEB_IOS_CLIENT_ID?: string
  }

  export const Config: NativeConfig
  export default Config
}
