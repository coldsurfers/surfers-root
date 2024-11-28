import { SubscribedConcertListScreenParam } from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Screens } from '../../lib/navigations/constants'
import { MainStackProp } from '../main-stack-navigation'

export type VenueStackParam = {
  [Screens.VenueDetailScreen]: SubscribedConcertListScreenParam
}

export type VenueStackScreenProp<T extends keyof VenueStackParam> = CompositeScreenProps<
  NativeStackScreenProps<VenueStackParam, T>,
  MainStackProp<'ConcertStackScreen'>
>
