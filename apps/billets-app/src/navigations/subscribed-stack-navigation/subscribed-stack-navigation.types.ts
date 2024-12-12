import { ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { SubscribedConcertListScreenParams } from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { zodNavigation, zodScreen } from '../../lib/navigations/constants'
import { MainStackScreenProps } from '../main-stack-navigation'

export type SubscribedStackParams = ZodNavigationParams<typeof zodNavigation.SubscribedStackNavigation>

export type SubscribedStackParamList = ZodNavigationParamList<{
  [zodScreen.SubscribedConcertListScreen.name]: SubscribedConcertListScreenParams
}>

export type SubscribedStackScreenProps<T extends keyof SubscribedStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SubscribedStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.SubscribedStackNavigation.name>
>
