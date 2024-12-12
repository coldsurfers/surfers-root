import { zodNavigation, ZodNavigationParamList, ZodNavigationParams, zodScreen } from '@/lib'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackScreenProps } from '../main-stack-navigation'

export type ConcertStackParams = ZodNavigationParams<typeof zodNavigation.ConcertStackNavigation>

export type ConcertStackParamList = ZodNavigationParamList<
  [typeof zodScreen.ConcertDetailScreen, typeof zodScreen.ConcertTicketListScreen]
>

export type ConcertStackScreenProps<T extends keyof ConcertStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ConcertStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.ConcertStackNavigation.name>
>
