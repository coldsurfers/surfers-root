import { ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { zodNavigation, zodScreen } from '../../lib/navigations/constants'
import { MainTabScreensProps } from '../main-tab-navigation/main-tab-navigation.types'

export type MyStackParams = ZodNavigationParams<typeof zodNavigation.MyStackNavigation>

export type MyStackParamList = ZodNavigationParamList<[typeof zodScreen.MyScreen]>

export type MyStackProp<T extends keyof MyStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<MyStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.MyStackNavigation.name>
>
