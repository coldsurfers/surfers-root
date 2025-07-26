import type { ZodScreenParams, zodScreen } from '@/lib';
import type { LoginStackScreenProps } from '@/navigations';

export type EmailSignupScreenParams = ZodScreenParams<typeof zodScreen.EmailSignupScreen>;

export type EmailSignupScreenProps = LoginStackScreenProps<typeof zodScreen.EmailSignupScreen.name>;
