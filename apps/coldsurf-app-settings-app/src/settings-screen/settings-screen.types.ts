import type {
  SettingsStackScreenProps,
  ZodScreenParams,
  zodScreen,
} from '@coldsurfers/navigation-utils';

export type SettingsScreenParams = ZodScreenParams<typeof zodScreen.SettingsScreen>;
export type SettingsScreenProps = SettingsStackScreenProps<'SettingsScreen'>;
