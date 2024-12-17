import { zodNavigation, ZodNavigationParamList, ZodNavigationParams, zodScreen } from '@/lib'
import { SearchScreenParams } from '@/screens'
import { ConcertMapScreenParams } from '@/screens/concert-map-screen'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainTabScreensProps } from '../main-tab-navigation'

export type SearchStackParams = ZodNavigationParams<typeof zodNavigation.SearchStackNavigation>

export type SearchStackParamList = ZodNavigationParamList<{
  [zodScreen.SearchScreen.name]: SearchScreenParams
  [zodScreen.ConcertMapScreen.name]: ConcertMapScreenParams
}>

export type SearchStackScreenProps<T extends keyof SearchStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.SearchStackNavigation.name>
>
