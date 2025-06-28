import type { ZodNavigationParamList, ZodNavigationParams } from '@/lib';
import type { SubscribedConcertListScreenParams } from '@/screens';
import type { SubscribedArtistListScreenParams } from '@/screens/subscribed-artist-list-screen';
import type { SubscribedVenueListScreenParams } from '@/screens/subscribed-venue-list-screen';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { type zodNavigation, zodScreen } from '../../lib/navigations/constants';
import type { MainStackScreenProps } from '../main-stack-navigation';

export type SubscribedStackParams = ZodNavigationParams<
  typeof zodNavigation.SubscribedStackNavigation
>;

export type SubscribedStackParamList = ZodNavigationParamList<{
  [zodScreen.SubscribedConcertListScreen.name]: SubscribedConcertListScreenParams;
  [zodScreen.SubscribedArtistListScreen.name]: SubscribedArtistListScreenParams;
  [zodScreen.SubscribedVenueListScreen.name]: SubscribedVenueListScreenParams;
}>;

export type SubscribedStackScreenProps<T extends keyof SubscribedStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SubscribedStackParamList, T>,
    MainStackScreenProps<typeof zodNavigation.SubscribedStackNavigation.name>
  >;
