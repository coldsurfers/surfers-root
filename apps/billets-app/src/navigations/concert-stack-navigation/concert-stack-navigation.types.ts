import { ConcertDetailScreenParam } from '@/screens'
import { ConcertTicketListScreenParam } from '@/screens/concert-ticket-list-screen/concert-ticket-list-screen.types'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Screens } from '../../lib/navigations/constants'
import { MainStackProp } from '../main-stack-navigation'

export type ConcertStackParam = {
  [Screens.ConcertDetailScreen]: ConcertDetailScreenParam
  [Screens.ConcertTicketListScreen]: ConcertTicketListScreenParam
}

export type ConcertStackScreenProp<T extends keyof ConcertStackParam> = CompositeScreenProps<
  NativeStackScreenProps<ConcertStackParam, T>,
  MainStackProp<'ConcertStackScreen'>
>
