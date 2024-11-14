import { SubscribedConcertListScreenProp } from '@/screens'
import { useNavigation, useRoute } from '@react-navigation/native'

export const useSubscribedConcertListScreenNavigation = () =>
  useNavigation<SubscribedConcertListScreenProp['navigation']>()
export const useSubscribedConcertListRoute = () => useRoute<SubscribedConcertListScreenProp['route']>()
