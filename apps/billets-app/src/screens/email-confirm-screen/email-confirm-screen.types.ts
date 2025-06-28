import type { ZodScreenParams, zodScreen } from '@/lib';
import type { LoginStackScreenProps } from '@/navigations';

export type EmailConfirmScreenParams = ZodScreenParams<typeof zodScreen.EmailConfirmScreen>;

export type EmailConfirmScreenProps = LoginStackScreenProps<
  typeof zodScreen.EmailConfirmScreen.name
>;
