import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MyScreenParams } from '../../screens/my-screen';
import type {
  ZodNavigationParamList,
  ZodNavigationParams,
  zodNavigation,
  zodScreen,
} from '../../utils';
import type { MainTabScreensProps } from '../main-tab-navigation/main-tab-navigation.types';

export type MyStackParams = ZodNavigationParams<typeof zodNavigation.MyStackNavigation>;

export type MyStackParamList = ZodNavigationParamList<{
  [zodScreen.MyScreen.name]: MyScreenParams;
}>;

export type MyStackScreenProps<T extends keyof MyStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<MyStackParamList, T>,
  MainTabScreensProps<typeof zodNavigation.MyStackNavigation.name>
>;
