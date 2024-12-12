import { useNavigation, useRoute } from '@react-navigation/native'
import { MyScreenProps } from './my-screen.types'

export const useMyScreenNavigation = () => {
  return useNavigation<MyScreenProps['navigation']>()
}
export const useMyScreenRoute = () => {
  return useRoute<MyScreenProps['route']>()
}
