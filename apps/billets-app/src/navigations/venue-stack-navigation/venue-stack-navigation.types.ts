import { ZodNavigationParamList } from '@/lib'
import { VenueDetailScreenParam } from '@/screens'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { zodNavigation, zodScreen } from '../../lib/navigations/constants'
import { MainStackScreenProps } from '../main-stack-navigation'

export type VenueStackParamList = ZodNavigationParamList<{
  [zodScreen.VenueDetailScreen.name]: VenueDetailScreenParam
}>

export type VenueStackScreenProp<T extends keyof VenueStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<VenueStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.VenueStackNavigation.name>
>
