import { Screens } from '@/lib'
import { SearchScreenParams } from '@/screens/search-screen/search-screen.types'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainTabProp } from '../main-tab-navigation'

export type SearchStackParam = {
  [Screens.SearchScreen]: SearchScreenParams
}

export type SearchStackProp<T extends keyof SearchStackParam> = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParam, T>,
  MainTabProp<'SearchStackScreen'>
>
