import { useNavigation, useRoute } from '@react-navigation/native'
import { ConcertDetailScreenProps } from './concert-detail-screen.types'

export const useConcertDetailScreenNavigation = () => {
  return useNavigation<ConcertDetailScreenProps['navigation']>()
}

export const useConcertDetailScreenRoute = () => {
  return useRoute<ConcertDetailScreenProps['route']>()
}
