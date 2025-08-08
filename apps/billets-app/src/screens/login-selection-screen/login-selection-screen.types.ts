import type { zodScreen } from '@/lib';
import type { LoginStackScreenProps } from '@coldsurfers/navigation-utils';
import type { z } from 'zod';

export type LoginSelectionScreenParams = z.infer<typeof zodScreen.LoginSelectionScreen.params>;

export type LoginSelectionScreenProps = LoginStackScreenProps<
  typeof zodScreen.LoginSelectionScreen.name
>;
