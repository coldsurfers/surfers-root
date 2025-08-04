import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsScreenParams } from '../../screens/settings-screen';
import type { ZodNavigationParamList, ZodNavigationParams } from '../../utils';
import { type zodNavigation, zodScreen } from '../../utils';
import type { MainStackScreenProps } from '../main-stack-navigation';

export type SettingsStackParams = ZodNavigationParams<typeof zodNavigation.SettingsStackNavigation>;

export type SettingsStackParamList = ZodNavigationParamList<{
  [zodScreen.SettingsScreen.name]: SettingsScreenParams;
}>;

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.SettingsStackNavigation.name>
>;
