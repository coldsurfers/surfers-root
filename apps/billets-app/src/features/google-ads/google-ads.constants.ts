import { Platform } from 'react-native'
import Config from 'react-native-config'
import { TestIds } from 'react-native-google-mobile-ads'

export const GOOGLE_AD_ID = {
  GOOGLE_AD_ID_INTERSTITIAL: __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.select({
        ios: Config.GOOGLE_MOBILE_ADS_IOS_INTERSTITIAL_ID,
        android: Config.GOOGLE_MOBILE_ADS_ANDROID_INTERSTITIAL_ID,
      }),
}
