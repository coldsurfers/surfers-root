import { ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { HomeScreenParams, LocationSelectionScreenParams } from '@/screens'
import { EventCategoryScreenParams } from '@/screens/event-category-screen'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { zodNavigation, zodScreen } from '../../lib/navigations/constants'
import { MainTabScreensProps } from '../main-tab-navigation/main-tab-navigation.types'

export type HomeStackParams = ZodNavigationParams<typeof zodNavigation.HomeStackNavigation>

export type HomeStackParamList = ZodNavigationParamList<{
  [zodScreen.HomeScreen.name]: HomeScreenParams
  [zodScreen.LocationSelectionScreen.name]: LocationSelectionScreenParams
  [zodScreen.EventCategoryScreen.name]: EventCategoryScreenParams
}>

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.HomeStackNavigation.name>
>
