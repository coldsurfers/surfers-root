import { Region } from '@coldsurfers/react-native-maps'

export type MapRegionWithZoomLevel = Region & {
  zoomLevel: number
}

export type UseMapRegionWithZoomLevelParams = {
  latitude: number
  longitude: number
}
