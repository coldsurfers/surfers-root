import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SubscribedArtistListScreenParams } from '../../screens/subscribed-artist-list-screen';
import type { SubscribedConcertListScreenParams } from '../../screens/subscribed-concert-list-screen';
import type { SubscribedVenueListScreenParams } from '../../screens/subscribed-venue-list-screen';
import { type zodNavigation, zodScreen } from '../../utils';
import type { ZodNavigationParamList, ZodNavigationParams } from '../../utils';
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
