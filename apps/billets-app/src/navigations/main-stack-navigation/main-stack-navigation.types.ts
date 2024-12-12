import { zodNavigation, ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type MainStackNavigationParams = ZodNavigationParams<typeof zodNavigation.MainStackNavigation>

export type MainStackNavigationParamList = ZodNavigationParamList<
  [
    typeof zodNavigation.MainTabNavigation,
    typeof zodNavigation.LoginStackNavigation,
    typeof zodNavigation.ConcertStackNavigation,
    typeof zodNavigation.SubscribedStackNavigation,
    typeof zodNavigation.VenueStackNavigation,
    typeof zodNavigation.ArtistStackNavigation,
  ]
>

export type MainStackScreenProps<T extends keyof MainStackNavigationParamList> = NativeStackScreenProps<
  MainStackNavigationParamList,
  T
>
