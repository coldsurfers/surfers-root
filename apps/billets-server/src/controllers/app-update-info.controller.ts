import type { AppUpdateInfoDTO } from '@/dtos/app-update-info.dto';

const HARD_CODED_APP_UPDATE_INFO: AppUpdateInfoDTO = {
  ios: {
    forceUpdate: true,
    latestVersion: '2.2.0',
    updateType: 'native',
  },
  android: {
    forceUpdate: false,
    latestVersion: '2.0.0',
    updateType: 'native',
  },
};

export const getAppUpdateInfoHandler = () => {
  return HARD_CODED_APP_UPDATE_INFO;
};
