import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Screens } from '../../lib/navigations'
import { HomeScreenParams } from '../../screens/home-screen/home-screen.types'
import { MainTabProp } from '../main-tab-navigation/main-tab-navigation.types'

export type HomeStackParam = {
  [Screens.HomeScreen]: HomeScreenParams
  [Screens.LocationSelectionScreen]: {
    //
  }
}

export type HomeStackScreenProps<T extends keyof HomeStackParam> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParam, T>,
  MainTabProp<'HomeStackScreen'>
>
