import type { LoginStackScreenProps } from '../../navigations/login-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type ActivateUserConfirmScreenParams = ZodScreenParams<
  typeof zodScreen.ActivateUserConfirmScreen
>;

export type ActivateUserConfirmScreenProps = LoginStackScreenProps<
  typeof zodScreen.ActivateUserConfirmScreen.name
>;
