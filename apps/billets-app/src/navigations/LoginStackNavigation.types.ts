import {CompositeScreenProps} from '@react-navigation/native';
import {Screens} from '../lib/navigations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackProp} from './MainStackNavigation.types';
import {EmailSignupScreenParam} from '../screens/EmailSignupScreen.types';
import {EmailConfirmScreenParam} from '../screens/EmailConfirmScreen.types';
import {EmailLoginScreenParam} from '../screens/EmailLoginScreen.type';
import {LoginSelectionScreenParam} from '../screens/LoginSelectionScreen.types';

export type LoginStackParam = {
  [Screens.LoginSelectionScreen]: LoginSelectionScreenParam;
  [Screens.EmailSignupScreen]: EmailSignupScreenParam;
  [Screens.EmailLoginScreen]: EmailLoginScreenParam;
  [Screens.EmailConfirmScreen]: EmailConfirmScreenParam;
};

export type LoginStackScreenProp<T extends keyof LoginStackParam> =
  CompositeScreenProps<
    NativeStackScreenProps<LoginStackParam, T>,
    MainStackProp<'LoginStackScreen'>
  >;
