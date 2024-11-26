import { StackScreens, TabScreens } from '@/lib/navigations/constants'
import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ConcertStackParam } from '../concert-stack-navigation'
import { LoginStackParam } from '../login-stack-navigation/login-stack-navigation.types'
import { MainTabNavigationParamList } from '../main-tab-navigation/main-tab-navigation.types'
import { SubscribedStackParam } from '../subscribed-stack-navigation/subscribed-stack-navigation.types'

export type MainStackNavigationParamList = {
  [TabScreens.MainTabScreen]: NavigatorScreenParams<MainTabNavigationParamList>
  [StackScreens.LoginStackScreen]: NavigatorScreenParams<LoginStackParam>
  [StackScreens.ConcertStackScreen]: NavigatorScreenParams<ConcertStackParam>
  [StackScreens.SubscribedStackScreen]: NavigatorScreenParams<SubscribedStackParam>
}

export type MainStackProp<T extends keyof MainStackNavigationParamList> = NativeStackScreenProps<
  MainStackNavigationParamList,
  T
>
