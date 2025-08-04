import type { z } from 'zod';
import type { LoginStackScreenProps } from '../../navigations/login-stack-navigation/login-stack-navigation.types';
import type { zodScreen } from '../../utils';

export type LoginSelectionScreenParams = z.infer<typeof zodScreen.LoginSelectionScreen.params>;

export type LoginSelectionScreenProps = LoginStackScreenProps<
  typeof zodScreen.LoginSelectionScreen.name
>;
