import { Linking, Platform } from 'react-native';
import Config from 'react-native-config';
import Share, { Social } from 'react-native-share';
import { captureRef } from 'react-native-view-shot';

const isInstagramInstalled = async () => {
  if (Platform.OS === 'ios') {
    const canOpen = await Linking.canOpenURL('instagram://');
    return canOpen;
  }
  const result = await Share.isPackageInstalled('com.instagram.android');
  return result.isInstalled;
};

export const shareInstagram = async (
  captureViewRef: Parameters<typeof captureRef>[0],
  {
    attributionURL,
  }: {
    attributionURL?: string;
  }
) => {
  try {
    const isInstagramAvailable = await isInstagramInstalled();
    if (!isInstagramAvailable) {
      return;
    }

    const uri = await captureRef(captureViewRef, {
      format: 'png',
      quality: 1,
    });
    await Share.shareSingle({
      stickerImage: uri,
      social: Social.InstagramStories,
      appId: Config.META_DEVELOPER_APP_ID ?? '',
      attributionURL,
      linkUrl: attributionURL,
      linkText: 'COLDSURF에서 열기',
    });
  } catch (e) {
    console.error(e);
  }
};

export const shareMore = async ({ url }: { url: string }) => {
  try {
    await Share.open({
      url,
    });
  } catch (e) {
    console.error(e);
  }
};
