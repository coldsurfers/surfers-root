import type { SettingsStackScreenProps } from '@coldsurfers/navigation-utils';
import type { ZodScreenParams, zodScreen } from '@coldsurfers/shared-utils/native';

export type SettingsScreenParams = ZodScreenParams<typeof zodScreen.SettingsScreen>;
export type SettingsScreenProps = SettingsStackScreenProps<'SettingsScreen'>;
