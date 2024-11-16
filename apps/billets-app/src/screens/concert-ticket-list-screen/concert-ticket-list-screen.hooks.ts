import { useNavigation, useRoute } from '@react-navigation/native'
import { ConcertTicketListScreenProp } from './concert-ticket-list-screen.types'

export const useConcertTicketListScreenNavigation = () => {
  return useNavigation<ConcertTicketListScreenProp['navigation']>()
}

export const useConcertTicketListScreenRoute = () => {
  return useRoute<ConcertTicketListScreenProp['route']>()
}
