import type { ZodNavigationParamList } from '@/lib';
import type { VenueDetailScreenParam } from '@/screens';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { type zodNavigation, zodScreen } from '../../lib/navigations/constants';
import type { MainStackScreenProps } from '../main-stack-navigation';

export type VenueStackParamList = ZodNavigationParamList<{
  [zodScreen.VenueDetailScreen.name]: VenueDetailScreenParam;
}>;

export type VenueStackScreenProp<T extends keyof VenueStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<VenueStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.VenueStackNavigation.name>
>;
