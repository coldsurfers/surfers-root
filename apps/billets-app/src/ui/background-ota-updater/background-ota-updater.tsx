import { HotUpdater } from '@hot-updater/react-native';
import { useLayoutEffect } from 'react';
import Config from 'react-native-config';

export const BackgroundOtaUpdater = () => {
  useLayoutEffect(() => {
    HotUpdater.checkForUpdate({
      source: `${Config.HOT_UPDATER_SUPABASE_URL}/functions/v1/update-server`,
    }).then((result) => {
      if (!result || result.shouldForceUpdate) {
        return;
      }
      HotUpdater.runUpdateProcess({
        source: `${Config.HOT_UPDATER_SUPABASE_URL}/functions/v1/update-server`,
      });
    });
  }, []);

  return null;
};
