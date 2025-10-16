import type { AppUpdateInfoDTO } from '@/dtos/app-update-info.dto';

const HARD_CODED_APP_UPDATE_INFO: AppUpdateInfoDTO = {
  ios: {
    forceUpdate: false,
    latestVersion: '2.5.3',
    updateType: 'ota',
  },
  android: {
    forceUpdate: true,
    latestVersion: '2.3.0',
    updateType: 'native',
  },
};

export const getAppUpdateInfoHandler = () => {
  return HARD_CODED_APP_UPDATE_INFO;
};
