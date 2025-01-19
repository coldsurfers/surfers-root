import { GeolocationPermissionAlertModal } from '@/ui/geolocation-permission-alert-modal'
import { memo } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGlobalModalStore } from '../stores/global-modal-store'

export const GlobalModal = memo(() => {
  const { visible: globalModalVisible, close } = useGlobalModalStore(
    useShallow((state) => ({
      visible: state.visible,
      close: state.close,
    })),
  )
  const { geolocationPermissionAlertModal } = globalModalVisible

  return (
    <>
      <GeolocationPermissionAlertModal
        visible={geolocationPermissionAlertModal}
        closeModal={() => close('geolocationPermissionAlertModal')}
      />
    </>
  )
})
