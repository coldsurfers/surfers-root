import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { type ZodNavigationParamList, type ZodNavigationParams, zodNavigation } from '../../utils';
import type { ArtistStackParamList } from '../artist-stack-navigation';
import type { EventStackParamList } from '../event-stack-navigation';
import type { LoginStackParamList } from '../login-stack-navigation';
import type { MainTabParamList } from '../main-tab-navigation';
import type { SettingsStackParamList } from '../settings-stack-navigation';
import type { SubscribedStackParamList } from '../subscribed-stack-navigation';
import type { VenueStackParamList } from '../venue-stack-navigation';

export type MainStackNavigationParams = ZodNavigationParams<
  typeof zodNavigation.MainStackNavigation
>;

export type MainStackNavigationParamList = ZodNavigationParamList<{
  [zodNavigation.MainTabNavigation.name]: NavigatorScreenParams<MainTabParamList>;
  [zodNavigation.LoginStackNavigation.name]: NavigatorScreenParams<LoginStackParamList>;
  [zodNavigation.EventStackNavigation.name]: NavigatorScreenParams<EventStackParamList>;
  [zodNavigation.SubscribedStackNavigation.name]: NavigatorScreenParams<SubscribedStackParamList>;
  [zodNavigation.VenueStackNavigation.name]: NavigatorScreenParams<VenueStackParamList>;
  [zodNavigation.ArtistStackNavigation.name]: NavigatorScreenParams<ArtistStackParamList>;
  [zodNavigation.SettingsStackNavigation.name]: NavigatorScreenParams<SettingsStackParamList>;
}>;

export type MainStackScreenProps<T extends keyof MainStackNavigationParamList> =
  NativeStackScreenProps<MainStackNavigationParamList, T>;
