import { GeolocationPermissionAlertModal } from '@/ui/geolocation-permission-alert-modal'
import { memo } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGlobalModalStore } from '../stores/global-modal-store'

export const GlobalModal = memo(() => {
  const { visible: globalModalVisible } = useGlobalModalStore(
    useShallow((state) => ({
      visible: state.visible,
    })),
  )
  return (
    <>
      <GeolocationPermissionAlertModal visible={globalModalVisible.geolocationPermissionAlertModal} />
    </>
  )
})
