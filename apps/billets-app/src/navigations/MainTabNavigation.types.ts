import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackScreens } from '../lib/navigations'
import { HomeStackParam } from './HomeStackNavigation.types'
import { MainStackNavigationParamList } from './main-stack-navigation'
import { MyStackParam } from './MyStackNavigation.types'
import { SearchStackParam } from './SearchStackNavigation'

export type MainTabNavigationParamList = {
  [StackScreens.HomeStackScreen]: NavigatorScreenParams<HomeStackParam>
  [StackScreens.SearchStackScreen]: NavigatorScreenParams<SearchStackParam>
  [StackScreens.MyStackScreen]: NavigatorScreenParams<MyStackParam>
}

export type MainTabProp<T extends keyof MainTabNavigationParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabNavigationParamList, T>,
  NativeStackScreenProps<MainStackNavigationParamList, 'MainTabScreen'>
>
