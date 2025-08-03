import type { LoginStackScreenProps } from '../../navigations/login-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type EmailSignupScreenParams = ZodScreenParams<typeof zodScreen.EmailSignupScreen>;

export type EmailSignupScreenProps = LoginStackScreenProps<typeof zodScreen.EmailSignupScreen.name>;
