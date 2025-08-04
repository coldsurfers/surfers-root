import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeScreenParams } from '../../screens/home-screen';
import type { LocationSelectionScreenParams } from '../../screens/location-selection-screen';
import type {
  ZodNavigationParamList,
  ZodNavigationParams,
  zodNavigation,
  zodScreen,
} from '../../utils';
import type { MainTabScreensProps } from '../main-tab-navigation/main-tab-navigation.types';

export type HomeStackParams = ZodNavigationParams<typeof zodNavigation.HomeStackNavigation>;

export type HomeStackParamList = ZodNavigationParamList<{
  [zodScreen.HomeScreen.name]: HomeScreenParams;
  [zodScreen.LocationSelectionScreen.name]: LocationSelectionScreenParams;
}>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.HomeStackNavigation.name>
>;
