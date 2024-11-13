import { useNavigation, useRoute } from '@react-navigation/native'
import { MyScreenProp } from './MyScreen.types'

export const useMyScreenNavigation = () => {
  return useNavigation<MyScreenProp['navigation']>()
}
export const useMyScreenRoute = () => {
  return useRoute<MyScreenProp['route']>()
}
