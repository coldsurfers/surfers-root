import { zodNavigation, ZodNavigationParamList, ZodNavigationParams, zodScreen } from '@/lib'
import { SearchScreenParams } from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainTabScreensProps } from '../main-tab-navigation'

export type SearchStackParams = ZodNavigationParams<typeof zodNavigation.SearchStackNavigation>

export type SearchStackParamList = ZodNavigationParamList<{
  [zodScreen.SearchScreen.name]: SearchScreenParams
}>

export type SearchStackScreenProps<T extends keyof SearchStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.SearchStackNavigation.name>
>
