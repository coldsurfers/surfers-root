import type { ZodScreenParams, zodScreen } from '@/lib';
import type { LoginStackScreenProps } from '@/navigations';

export type ActivateUserConfirmScreenParams = ZodScreenParams<
  typeof zodScreen.ActivateUserConfirmScreen
>;

export type ActivateUserConfirmScreenProps = LoginStackScreenProps<
  typeof zodScreen.ActivateUserConfirmScreen.name
>;
