import { ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { ArtistDetailScreenParam } from '@/screens/artist-detail-screen'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { zodNavigation, zodScreen } from '../../lib/navigations/constants'
import { MainStackScreenProps } from '../main-stack-navigation'

export type ArtistStackParams = ZodNavigationParams<typeof zodNavigation.ArtistStackNavigation>

export type ArtistStackParamList = ZodNavigationParamList<{
  [zodScreen.ArtistDetailScreen.name]: ArtistDetailScreenParam
}>

export type ArtistStackScreenProp<T extends keyof ArtistStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ArtistStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.ArtistStackNavigation.name>
>
