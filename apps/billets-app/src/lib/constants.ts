import { Dimensions } from 'react-native'
import Config from 'react-native-config'
import { match } from 'ts-pattern'

export const TAB_BAR_HEIGHT = 75
export const CONCERT_DETAIL_LIST_HEADER_HEIGHT = Math.floor(Dimensions.get('screen').height / 2)

export const GOOGLE_SIGNIN_OPTIONS = {
  webClientId: Config.GOOGLE_SIGNIN_WEB_CLIENT_ID ?? '',
  iosClientId: Config.GOOGLE_SIGNIN_WEB_IOS_CLIENT_ID ?? '',
}

export const API_BASE_URL = (() => {
  return match(Config.PLATFORM)
    .with('development', () => 'https://dev.api.billets.coldsurf.io')
    .otherwise(() => 'https://api.billets.coldsurf.io')
})()

export const KOPIS_COPYRIGHT_TEXT = '출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)'
