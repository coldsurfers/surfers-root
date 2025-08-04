import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ActivateUserConfirmScreenParams } from '../../screens/activate-user-confirm-screen';
import type { EmailConfirmScreenParams } from '../../screens/email-confirm-screen';
import type { EmailLoginScreenParams } from '../../screens/email-login-screen';
import type { EmailSignupScreenParams } from '../../screens/email-signup-screen';
import type { LoginSelectionScreenParams } from '../../screens/login-selection-screen';
import {
  type ZodNavigationParamList,
  type ZodNavigationParams,
  type zodNavigation,
  zodScreen,
} from '../../utils';
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
