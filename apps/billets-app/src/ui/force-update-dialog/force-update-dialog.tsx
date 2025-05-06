import { Button, Modal, Text } from '@coldsurfers/ocean-road/native'
import { useLayoutEffect } from 'react'
import { View } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import { match } from 'ts-pattern'

const NativeUpdateView = () => {
  return (
    <Modal visible>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>업데이트가 필요합니다.</Text>
        <Button onPress={() => {}}>업데이트 하기</Button>
      </View>
    </Modal>
  )
}

const OtaUpdateView = () => {
  return <View>{/* @TODO: implement ota update view */}</View>
}

export const ForceUpdateDialog = ({ updateType }: { updateType: 'native' | 'ota' }) => {
  useLayoutEffect(() => {
    BootSplash.hide({ fade: true })
  }, [])

  return match(updateType)
    .with('native', () => {
      return <NativeUpdateView />
    })
    .with('ota', () => {
      return <OtaUpdateView />
    })
    .exhaustive()
}
