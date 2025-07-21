import { Button, Modal, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { APP_STORE_URL } from '@coldsurfers/shared-utils';
import FastImage from '@d11/react-native-fast-image';
import { HotUpdater, useHotUpdaterStore } from '@hot-updater/react-native';
import { useLayoutEffect, useState } from 'react';
import { Linking } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Config from 'react-native-config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { match } from 'ts-pattern';
import { CommonScreenLayout } from '../common-screen-layout';
import { GlobalSuspenseFallback } from '../global-suspense-fallback';
import { OtaUpdateView } from '../ota-update-view';

const NativeUpdate = () => {
  const { semantics } = useColorScheme();
  return (
    <SafeAreaProvider>
      <Modal visible>
        <CommonScreenLayout
          edges={['top']}
          style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          <FastImage
            source={require('assets/bootsplash/logo.png')}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              marginBottom: 12,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: semantics.foreground[1],
              textAlign: 'center',
            }}
          >
            {'업데이트가 필요하지만,\n새로운 앱이 출시 되었어요! 🎉'}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: semantics.foreground[1],
              textAlign: 'center',
              marginVertical: 12,
            }}
          >
            {'스토어에서 업데이트를 부탁드릴게요'}
          </Text>
          <Button onPress={() => Linking.openURL(APP_STORE_URL)}>업데이트 하러가기</Button>
        </CommonScreenLayout>
      </Modal>
    </SafeAreaProvider>
  );
};

const OtaUpdate = ({ onNothing }: { onNothing: () => void }) => {
  const { progress: updateProgress } = useHotUpdaterStore();
  const updateProgressPercentage = Math.round(updateProgress * 100);
  const [hasPackage, setHasPackage] = useState(false);

  useLayoutEffect(() => {
    if (!Config.HOT_UPDATER_SUPABASE_URL) {
      return;
    }
    HotUpdater.checkForUpdate({
      source: `${Config.HOT_UPDATER_SUPABASE_URL}/functions/v1/update-server`,
    }).then((result) => {
      if (!result || !result.shouldForceUpdate) {
        onNothing();
        return;
      }
      setHasPackage(true);
      HotUpdater.runUpdateProcess({
        reloadOnForceUpdate: true,
        source: `${Config.HOT_UPDATER_SUPABASE_URL}/functions/v1/update-server`,
      });
    });
  }, [onNothing]);

  if (!hasPackage) {
    return <GlobalSuspenseFallback />;
  }

  return <OtaUpdateView updateProgressPercentage={updateProgressPercentage} />;
};

export const ForceUpdateDialog = ({
  updateType,
  onNothing,
}: {
  updateType: 'native' | 'ota';
  onNothing: () => void;
}) => {
  useLayoutEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return match(updateType)
    .with('native', () => {
      return <NativeUpdate />;
    })
    .with('ota', () => {
      return <OtaUpdate onNothing={onNothing} />;
    })
    .exhaustive();
};
