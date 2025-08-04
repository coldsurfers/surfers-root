import type { TextProps } from 'react-native';

export type VersionTextProps = TextProps;
export type MenuItemProps = { type: 'logout' | 'delete-account'; onPress: () => void };
export type SettingsScreenProps = { pkgVersion: string; onLogout: () => Promise<void> | void };
