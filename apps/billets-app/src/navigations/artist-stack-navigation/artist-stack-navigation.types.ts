import type { ZodNavigationParamList, ZodNavigationParams } from '@/lib';
import type { ArtistDetailScreenParam } from '@/screens/artist-detail-screen';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { type zodNavigation, zodScreen } from '../../lib/navigations/constants';
import type { MainStackScreenProps } from '../main-stack-navigation';

export type ArtistStackParams = ZodNavigationParams<typeof zodNavigation.ArtistStackNavigation>;

export type ArtistStackParamList = ZodNavigationParamList<{
  [zodScreen.ArtistDetailScreen.name]: ArtistDetailScreenParam;
}>;

export type ArtistStackScreenProp<T extends keyof ArtistStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ArtistStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.ArtistStackNavigation.name>
>;
