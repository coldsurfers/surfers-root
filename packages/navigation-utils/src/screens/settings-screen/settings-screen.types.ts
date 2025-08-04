import type { SettingsStackScreenProps } from '../../navigations/settings-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type SettingsScreenParams = ZodScreenParams<typeof zodScreen.SettingsScreen>;
export type SettingsScreenProps = SettingsStackScreenProps<'SettingsScreen'>;
