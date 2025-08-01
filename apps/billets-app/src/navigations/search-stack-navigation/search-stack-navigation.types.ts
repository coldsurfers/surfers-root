import {
  type ZodNavigationParamList,
  type ZodNavigationParams,
  type zodNavigation,
  zodScreen,
} from '@/lib';
import type { SearchScreenParams } from '@/screens';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabScreensProps } from '../main-tab-navigation';

export type SearchStackParams = ZodNavigationParams<typeof zodNavigation.SearchStackNavigation>;

export type SearchStackParamList = ZodNavigationParamList<{
  [zodScreen.SearchScreen.name]: SearchScreenParams;
}>;

export type SearchStackScreenProps<T extends keyof SearchStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.SearchStackNavigation.name>
>;
