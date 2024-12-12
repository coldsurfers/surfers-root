import MobileAds, { InterstitialAd } from 'react-native-google-mobile-ads'
import { GOOGLE_AD_ID } from './google-ads.constants'

export const googleAdsUtils = {
  initialize: () => {
    return MobileAds().initialize()
  },
  createInterstitialAd: () => {
    if (!GOOGLE_AD_ID.GOOGLE_AD_ID_INTERSTITIAL) {
      return
    }
    return InterstitialAd.createForAdRequest(GOOGLE_AD_ID.GOOGLE_AD_ID_INTERSTITIAL)
  },
}
