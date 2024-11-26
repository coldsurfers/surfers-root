import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Screens } from '../../lib/navigations/constants'
import { MyScreenParam } from '../../screens/my-screen/my-screen.types'
import { MainTabProp } from '../main-tab-navigation/main-tab-navigation.types'

export type MyStackParam = {
  [Screens.MyScreen]: MyScreenParam
}

export type MyStackProp<T extends keyof MyStackParam> = CompositeScreenProps<
  NativeStackScreenProps<MyStackParam, T>,
  MainTabProp<'MyStackScreen'>
>
