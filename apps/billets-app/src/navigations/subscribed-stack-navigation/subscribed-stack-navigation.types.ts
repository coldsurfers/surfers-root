import { ZodNavigationParamList, ZodNavigationParams } from '@/lib'
import { SubscribedConcertListScreenParams } from '@/screens'
import { SubscribedArtistListScreenParams } from '@/screens/subscribed-artist-list-screen'
import { SubscribedVenueListScreenParams } from '@/screens/subscribed-venue-list-screen'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { zodNavigation, zodScreen } from '../../lib/navigations/constants'
import { MainStackScreenProps } from '../main-stack-navigation'

export type SubscribedStackParams = ZodNavigationParams<typeof zodNavigation.SubscribedStackNavigation>

export type SubscribedStackParamList = ZodNavigationParamList<{
  [zodScreen.SubscribedConcertListScreen.name]: SubscribedConcertListScreenParams
  [zodScreen.SubscribedArtistListScreen.name]: SubscribedArtistListScreenParams
  [zodScreen.SubscribedVenueListScreen.name]: SubscribedVenueListScreenParams
}>

export type SubscribedStackScreenProps<T extends keyof SubscribedStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SubscribedStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.SubscribedStackNavigation.name>
>
