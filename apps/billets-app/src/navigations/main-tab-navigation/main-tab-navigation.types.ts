import { zodNavigation, ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { HomeStackParamList } from '../home-stack-navigation'
import { MainStackNavigationParamList, MainStackScreenProps } from '../main-stack-navigation'
import { MyStackParamList } from '../my-stack-navigation'
import { SearchStackParamList } from '../search-stack-navigation'

export type MainTabParams = ZodNavigationParams<typeof zodNavigation.MainTabNavigation>

export type MainTabParamList = ZodNavigationParamList<{
  [zodNavigation.HomeStackNavigation.name]: NavigatorScreenParams<HomeStackParamList>
  [zodNavigation.SearchStackNavigation.name]: NavigatorScreenParams<SearchStackParamList>
  [zodNavigation.MyStackNavigation.name]: NavigatorScreenParams<MyStackParamList>
}>

// ZodNavigationParamList<
//   [
//     typeof zodNavigation.HomeStackNavigation,
//     typeof zodNavigation.SearchStackNavigation,
//     typeof zodNavigation.MyStackNavigation,
//   ]
// >

export type MainTabScreensProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  MainStackScreenProps<keyof MainStackNavigationParamList>
>
