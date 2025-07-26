import {
  type ZodNavigationParamList,
  type ZodNavigationParams,
  type zodNavigation,
  zodScreen,
} from '@/lib';
import type {
  ActivateUserConfirmScreenParams,
  EmailConfirmScreenParams,
  EmailLoginScreenParams,
  EmailSignupScreenParams,
  LoginSelectionScreenParams,
} from '@/screens';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackScreenProps } from '../main-stack-navigation';

export type LoginStackParams = ZodNavigationParams<typeof zodNavigation.LoginStackNavigation>;

export type LoginStackParamList = ZodNavigationParamList<{
  [zodScreen.LoginSelectionScreen.name]: LoginSelectionScreenParams;
  [zodScreen.EmailSignupScreen.name]: EmailSignupScreenParams;
  [zodScreen.EmailLoginScreen.name]: EmailLoginScreenParams;
  [zodScreen.EmailConfirmScreen.name]: EmailConfirmScreenParams;
  [zodScreen.ActivateUserConfirmScreen.name]: ActivateUserConfirmScreenParams;
}>;

export type LoginStackScreenProps<T extends keyof LoginStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.LoginStackNavigation.name>
>;
