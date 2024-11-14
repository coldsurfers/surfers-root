import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackScreens } from '../../lib/navigations'
import { HomeStackParam } from '../home-stack-navigation/home-stack-navigation.types'
import { MainStackNavigationParamList } from '../main-stack-navigation'
import { MyStackParam } from '../my-stack-navigation/my-stack-navigation.types'
import { SearchStackParam } from '../search-stack-navigation'

export type MainTabNavigationParamList = {
  [StackScreens.HomeStackScreen]: NavigatorScreenParams<HomeStackParam>
  [StackScreens.SearchStackScreen]: NavigatorScreenParams<SearchStackParam>
  [StackScreens.MyStackScreen]: NavigatorScreenParams<MyStackParam>
}

export type MainTabProp<T extends keyof MainTabNavigationParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabNavigationParamList, T>,
  NativeStackScreenProps<MainStackNavigationParamList, 'MainTabScreen'>
>
