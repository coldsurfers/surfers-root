import { Modal, Text } from '@coldsurfers/ocean-road/native'

interface GeolocationPermissionAlertModalProps {
  visible: boolean
}

export const GeolocationPermissionAlertModal = ({ visible }: GeolocationPermissionAlertModalProps) => {
  return (
    <Modal visible={visible}>
      <Text>Geolocation Permission Alert Modal</Text>
    </Modal>
  )
}
