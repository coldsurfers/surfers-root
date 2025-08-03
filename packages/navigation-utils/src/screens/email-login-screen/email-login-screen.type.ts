import type { LoginStackScreenProps } from '../../navigations/login-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type EmailLoginScreenParams = ZodScreenParams<typeof zodScreen.EmailLoginScreen>;

export type EmailLoginScreenProps = LoginStackScreenProps<typeof zodScreen.EmailLoginScreen.name>;
