import type { ZodScreenParams, zodScreen } from '@/lib';
import type { LoginStackScreenProps } from '@/navigations';

export type EmailLoginScreenParams = ZodScreenParams<typeof zodScreen.EmailLoginScreen>;

export type EmailLoginScreenProps = LoginStackScreenProps<typeof zodScreen.EmailLoginScreen.name>;
