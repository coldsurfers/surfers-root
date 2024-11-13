import { CompositeScreenProps } from '@react-navigation/native'
import { Screens } from '../lib/navigations'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackProp } from './MainStackNavigation.types'
import { ConcertDetailScreenParam } from '../screens/ConcertDetailScreen.types'

export type ConcertStackParam = {
  [Screens.ConcertDetailScreen]: ConcertDetailScreenParam
}

export type ConcertStackScreenProp<T extends keyof ConcertStackParam> = CompositeScreenProps<
  NativeStackScreenProps<ConcertStackParam, T>,
  MainStackProp<'ConcertStackScreen'>
>
