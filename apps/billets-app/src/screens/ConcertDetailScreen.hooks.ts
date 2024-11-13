import { useNavigation, useRoute } from '@react-navigation/native'
import { ConcertDetailScreenProp } from './ConcertDetailScreen.types'

export const useConcertDetailScreenNavigation = () => {
  return useNavigation<ConcertDetailScreenProp['navigation']>()
}

export const useConcertDetailScreenRoute = () => {
  return useRoute<ConcertDetailScreenProp['route']>()
}
