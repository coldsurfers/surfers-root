import { Linking, Platform } from 'react-native'

type OpenMapArgs = {
  lat: number
  lng: number
  label: string
}
export const openMap = ({ lat, lng, label }: OpenMapArgs) => {
  const scheme = Platform.select({
    ios: `maps://?q=${label}&ll=${lat},${lng}`,
    android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
  })

  if (scheme) {
    Linking.openURL(scheme).catch((err) => console.error('Error opening map: ', err))
  }
}
