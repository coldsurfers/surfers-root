import {CompositeScreenProps} from '@react-navigation/native';
import {Screens} from '../lib/navigations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArtistAddScreenParam} from '../screens/ArtistAddScreen';
import {MyScreenParam} from '../screens/MyScreen.types';
import {MainTabProp} from './MainTabNavigation.types';

export type MyStackParam = {
  [Screens.MyScreen]: MyScreenParam;
  [Screens.ArtistAddScreen]: ArtistAddScreenParam;
};

export type MyStackProp<T extends keyof MyStackParam> = CompositeScreenProps<
  NativeStackScreenProps<MyStackParam, T>,
  MainTabProp<'MyStackScreen'>
>;
