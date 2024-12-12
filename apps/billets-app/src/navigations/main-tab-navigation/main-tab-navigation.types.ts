import { zodNavigation, ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { MainStackNavigationParamList, MainStackScreenProps } from '../main-stack-navigation'

export type MainTabParams = ZodNavigationParams<typeof zodNavigation.MainTabNavigation>

export type MainTabParamList = ZodNavigationParamList<
  [
    typeof zodNavigation.HomeStackNavigation,
    typeof zodNavigation.SearchStackNavigation,
    typeof zodNavigation.MyStackNavigation,
  ]
>

export type MainTabScreensProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  MainStackScreenProps<keyof MainStackNavigationParamList>
>
