import { zodNavigation, ZodNavigationParamList, ZodNavigationParams, zodScreen } from '@/lib'
import { ConcertTicketListScreenParams, EventDetailScreenParams } from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackScreenProps } from '../main-stack-navigation'

export type EventStackParams = ZodNavigationParams<typeof zodNavigation.EventStackNavigation>

export type EventStackParamList = ZodNavigationParamList<{
  [zodScreen.EventDetailScreen.name]: EventDetailScreenParams
  [zodScreen.ConcertTicketListScreen.name]: ConcertTicketListScreenParams
}>

export type EventStackScreenProps<T extends keyof EventStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<EventStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.EventStackNavigation.name>
>
