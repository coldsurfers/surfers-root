import { zodNavigation, ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ArtistStackParamList } from '../artist-stack-navigation'
import { ConcertStackParamList } from '../concert-stack-navigation'
import { LoginStackParamList } from '../login-stack-navigation'
import { MainTabParamList } from '../main-tab-navigation'
import { SubscribedStackParamList } from '../subscribed-stack-navigation'
import { VenueStackParamList } from '../venue-stack-navigation'

export type MainStackNavigationParams = ZodNavigationParams<typeof zodNavigation.MainStackNavigation>

export type MainStackNavigationParamList = ZodNavigationParamList<{
  [zodNavigation.MainTabNavigation.name]: NavigatorScreenParams<MainTabParamList>
  [zodNavigation.LoginStackNavigation.name]: NavigatorScreenParams<LoginStackParamList>
  [zodNavigation.ConcertStackNavigation.name]: NavigatorScreenParams<ConcertStackParamList>
  [zodNavigation.SubscribedStackNavigation.name]: NavigatorScreenParams<SubscribedStackParamList>
  [zodNavigation.VenueStackNavigation.name]: NavigatorScreenParams<VenueStackParamList>
  [zodNavigation.ArtistStackNavigation.name]: NavigatorScreenParams<ArtistStackParamList>
}>

export type MainStackScreenProps<T extends keyof MainStackNavigationParamList> = NativeStackScreenProps<
  MainStackNavigationParamList,
  T
>
