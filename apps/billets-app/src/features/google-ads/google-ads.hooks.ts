import { useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'
import { AdEventType } from 'react-native-google-mobile-ads'
import { googleAdsUtils } from './google-ads.utils'

export const useInterstitialAd = ({
  autoLoadOnMount = true,
  onAdClosed,
  onAdOpened,
}: {
  autoLoadOnMount?: boolean
  onAdOpened?: () => void
  onAdClosed?: () => void
}) => {
  const [interstitialAd] = useState(() => googleAdsUtils.createInterstitialAd())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!interstitialAd) {
      return
    }
    const unsubscribeLoaded = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true)
    })

    const unsubscribeOpened = interstitialAd.addAdEventListener(AdEventType.OPENED, () => {
      if (Platform.OS === 'ios') {
        // Prevent the close button from being unreachable by hiding the status bar on iOS
        StatusBar.setHidden(true)
      }
      onAdOpened?.()
    })

    const unsubscribeClosed = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(false)
      }
      onAdClosed?.()
    })

    if (autoLoadOnMount) {
      interstitialAd.load()
    }

    return () => {
      unsubscribeClosed()
      unsubscribeLoaded()
      unsubscribeOpened()
    }
  }, [autoLoadOnMount, interstitialAd, onAdClosed, onAdOpened])

  return {
    loaded,
    interstitialAd,
    show: () => {
      interstitialAd?.show()
    },
    load: () => {
      interstitialAd?.load()
    },
  }
}
