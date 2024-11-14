import { SubscribedConcertListScreenParam } from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Screens } from '../../lib/navigations'
import { MainStackProp } from '../main-stack-navigation'

export type SubscribedStackParam = {
  [Screens.SubscribedConcertListScreen]: SubscribedConcertListScreenParam
}

export type SubscribedStackScreenProp<T extends keyof SubscribedStackParam> = CompositeScreenProps<
  NativeStackScreenProps<SubscribedStackParam, T>,
  MainStackProp<'ConcertStackScreen'>
>
