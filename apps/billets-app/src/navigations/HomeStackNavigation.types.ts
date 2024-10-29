import {CompositeScreenProps} from '@react-navigation/native';
import {Screens} from '../lib/navigations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeScreenParams} from '../screens/HomeScreen.types';
import {MainTabProp} from './MainTabNavigation.types';

export type HomeStackParam = {
  [Screens.HomeScreen]: HomeScreenParams;
  [Screens.LocationSelectionScreen]: {};
};

export type HomeStackScreenProps<T extends keyof HomeStackParam> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParam, T>,
    MainTabProp<'HomeStackScreen'>
  >;
