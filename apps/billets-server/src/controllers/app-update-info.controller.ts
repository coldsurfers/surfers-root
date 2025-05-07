import { AppUpdateInfoDTO } from '@/dtos/app-update-info.dto'

const HARD_CODED_APP_UPDATE_INFO: AppUpdateInfoDTO = {
  ios: {
    forceUpdate: true,
    latestVersion: '2.0.2',
    updateType: 'ota',
  },
  android: {
    forceUpdate: false,
    latestVersion: '2.0.0',
    updateType: 'native',
  },
}

export const getAppUpdateInfoHandler = () => {
  return HARD_CODED_APP_UPDATE_INFO
}
