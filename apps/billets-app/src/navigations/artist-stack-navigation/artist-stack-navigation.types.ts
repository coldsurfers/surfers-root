import { ArtistDetailScreenParam } from '@/screens/artist-detail-screen'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Screens } from '../../lib/navigations/constants'
import { MainStackProp } from '../main-stack-navigation'

export type ArtistStackParam = {
  [Screens.ArtistDetailScreen]: ArtistDetailScreenParam
}

export type ArtistStackScreenProp<T extends keyof ArtistStackParam> = CompositeScreenProps<
  NativeStackScreenProps<ArtistStackParam, T>,
  MainStackProp<'ConcertStackScreen'>
>
