import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Screens } from '../lib/navigations'
import { ConcertDetailScreenParam } from '../screens/ConcertDetailScreen.types'
import { MainStackProp } from './main-stack-navigation'

export type ConcertStackParam = {
  [Screens.ConcertDetailScreen]: ConcertDetailScreenParam
}

export type ConcertStackScreenProp<T extends keyof ConcertStackParam> = CompositeScreenProps<
  NativeStackScreenProps<ConcertStackParam, T>,
  MainStackProp<'ConcertStackScreen'>
>
