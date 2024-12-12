import { ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { zodNavigation, zodScreen } from '../../lib/navigations/constants'
import { MainTabScreensProps } from '../main-tab-navigation/main-tab-navigation.types'

export type HomeStackParams = ZodNavigationParams<typeof zodNavigation.HomeStackNavigation>

export type HomeStackParamList = ZodNavigationParamList<
  [typeof zodScreen.HomeScreen, typeof zodScreen.LocationSelectionScreen]
>

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.HomeStackNavigation.name>
>
