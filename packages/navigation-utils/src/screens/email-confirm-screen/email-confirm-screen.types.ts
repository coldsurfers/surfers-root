import type { LoginStackScreenProps } from '../../navigations/login-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type EmailConfirmScreenParams = ZodScreenParams<typeof zodScreen.EmailConfirmScreen>;

export type EmailConfirmScreenProps = LoginStackScreenProps<
  typeof zodScreen.EmailConfirmScreen.name
>;
