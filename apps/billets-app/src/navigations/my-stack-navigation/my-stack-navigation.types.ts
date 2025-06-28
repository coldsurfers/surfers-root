import type { ZodNavigationParamList, ZodNavigationParams } from '@/lib';
import type { MyScreenParams } from '@/screens';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { type zodNavigation, zodScreen } from '../../lib/navigations/constants';
import type { MainTabScreensProps } from '../main-tab-navigation/main-tab-navigation.types';

export type MyStackParams = ZodNavigationParams<typeof zodNavigation.MyStackNavigation>;

export type MyStackParamList = ZodNavigationParamList<{
  [zodScreen.MyScreen.name]: MyScreenParams;
}>;

export type MyStackScreenProps<T extends keyof MyStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<MyStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.MyStackNavigation.name>
>;
