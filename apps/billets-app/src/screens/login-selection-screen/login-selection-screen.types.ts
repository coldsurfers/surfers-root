import type { zodScreen } from '@/lib';
import type { z } from 'zod';
import type { LoginStackScreenProps } from '../../navigations/login-stack-navigation/login-stack-navigation.types';

export type LoginSelectionScreenParams = z.infer<typeof zodScreen.LoginSelectionScreen.params>;

export type LoginSelectionScreenProps = LoginStackScreenProps<
  typeof zodScreen.LoginSelectionScreen.name
>;
