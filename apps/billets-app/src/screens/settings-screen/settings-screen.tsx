import { AuthContext } from '@/lib/contexts';
import { useLoadRemoteApp } from '@/lib/hooks/use-load-remote-app';
import { useContext } from 'react';
import pkg from '../../../package.json';

export const SettingsScreen = () => {
  const { isLoading, component: RemoteSettingsScreen } = useLoadRemoteApp({
    appName: 'settings',
  });
  const { logout } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return RemoteSettingsScreen ? (
    <RemoteSettingsScreen pkgVersion={pkg.version} onLogout={logout} />
  ) : null;
};
