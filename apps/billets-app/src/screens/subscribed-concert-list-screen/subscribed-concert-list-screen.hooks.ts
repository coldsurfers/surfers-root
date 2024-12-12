import { useNavigation, useRoute } from '@react-navigation/native'
import { SubscribedConcertListScreenProps } from './subscribed-concert-list-screen.types'

export const useSubscribedConcertListScreenNavigation = () =>
  useNavigation<SubscribedConcertListScreenProps['navigation']>()
export const useSubscribedConcertListRoute = () => useRoute<SubscribedConcertListScreenProps['route']>()
