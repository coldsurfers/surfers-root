import type { ZodScreenParams, zodScreen } from '@/lib';
import type { LoginStackScreenProps } from '@coldsurfers/navigation-utils';

export type EmailLoginScreenParams = ZodScreenParams<typeof zodScreen.EmailLoginScreen>;

export type EmailLoginScreenProps = LoginStackScreenProps<typeof zodScreen.EmailLoginScreen.name>;
