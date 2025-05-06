import { Button, Modal, Text } from '@coldsurfers/ocean-road/native'
import { APP_STORE_URL } from '@coldsurfers/shared-utils'
import { HotUpdater, useHotUpdaterStore } from '@hot-updater/react-native'
import { useLayoutEffect } from 'react'
import { Linking, View } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import Config from 'react-native-config'
import { match } from 'ts-pattern'
import { OtaUpdateView } from '../ota-update-view'

const NativeUpdate = () => {
  return (
    <Modal visible>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>업데이트가 필요합니다.</Text>
        <Button onPress={() => Linking.openURL(APP_STORE_URL)}>업데이트 하기</Button>
      </View>
    </Modal>
  )
}

const OtaUpdate = () => {
  const { progress: updateProgress } = useHotUpdaterStore()
  const updateProgressPercentage = updateProgress * 100

  useLayoutEffect(() => {
    HotUpdater.checkForUpdate({
      source: `${Config.HOT_UPDATER_SUPABASE_URL!}/functions/v1/update-server`,
    }).then((result) => {
      if (!result || !result.shouldForceUpdate) {
        return
      }
      HotUpdater.runUpdateProcess({
        reloadOnForceUpdate: true,
        source: `${Config.HOT_UPDATER_SUPABASE_URL!}/functions/v1/update-server`,
      })
    })
  }, [])

  return <OtaUpdateView updateProgressPercentage={updateProgressPercentage} />
}

export const ForceUpdateDialog = ({ updateType }: { updateType: 'native' | 'ota' }) => {
  useLayoutEffect(() => {
    BootSplash.hide({ fade: true })
  }, [])

  return match(updateType)
    .with('native', () => {
      return <NativeUpdate />
    })
    .with('ota', () => {
      return <OtaUpdate />
    })
    .exhaustive()
}
