import { StackScreens, TabScreens } from '@/lib/navigations'
import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ConcertStackParam } from '../concert-stack-navigation'
import { LoginStackParam } from '../login-stack-navigation/login-stack-navigation.types'
import { MainTabNavigationParamList } from '../MainTabNavigation.types'

export type MainStackNavigationParamList = {
  [TabScreens.MainTabScreen]: NavigatorScreenParams<MainTabNavigationParamList>
  [StackScreens.LoginStackScreen]: NavigatorScreenParams<LoginStackParam>
  // [StackScreens.FundingStackScreen]: NavigatorScreenParams<FundingStackParam>;
  [StackScreens.ConcertStackScreen]: NavigatorScreenParams<ConcertStackParam>
}

export type MainStackProp<T extends keyof MainStackNavigationParamList> = NativeStackScreenProps<
  MainStackNavigationParamList,
  T
>
