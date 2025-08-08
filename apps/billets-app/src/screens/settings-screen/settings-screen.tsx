import { AuthContext } from '@/lib/contexts';
import { useLoadRemoteApp } from '@/lib/hooks/use-load-remote-app';
import { CommonScreenLayout } from '@coldsurfers/ocean-road-extension/native';
import { Spinner } from '@coldsurfers/ocean-road/native';
import { useContext } from 'react';
import pkg from '../../../package.json';

export const SettingsScreen = () => {
  const { component: RemoteSettingsScreen } = useLoadRemoteApp({
    appName: 'settings',
  });
  const { logout } = useContext(AuthContext);

  if (!RemoteSettingsScreen) {
    return (
      <CommonScreenLayout>
        <Spinner positionCenter />
      </CommonScreenLayout>
    );
  }

  return RemoteSettingsScreen ? (
    <RemoteSettingsScreen pkgVersion={pkg.version} onLogout={logout} />
  ) : null;
};
