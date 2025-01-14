import { Dimensions } from 'react-native'
import Config from 'react-native-config'

export const TAB_BAR_HEIGHT = 75
export const CONCERT_DETAIL_LIST_HEADER_HEIGHT = Dimensions.get('screen').height / 2

export const GOOGLE_SIGNIN_OPTIONS = {
  webClientId: Config.GOOGLE_SIGNIN_WEB_CLIENT_ID ?? '',
  iosClientId: Config.GOOGLE_SIGNIN_WEB_IOS_CLIENT_ID ?? '',
}

export const API_BASE_URL = __DEV__ ? 'https://dev.api.billets.coldsurf.io' : 'https://api.billets.coldsurf.io'
