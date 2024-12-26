'use client'

import { useShallow } from 'zustand/shallow'
import { useCommonStore } from '../../(stores)'
import { ShareModal as ShareModalUI } from '../../(ui)'

export function ShareModal() {
  const { shareModalVisible, sharedLink, toggleShareModalVisible, setSharedLink } = useCommonStore(
    useShallow((state) => ({
      shareModalVisible: state.isShareModalVisible,
      sharedLink: state.sharedLink,
      toggleShareModalVisible: state.toggleShareModalVisible,
      setSharedLink: state.setSharedLink,
    })),
  )
  return (
    <ShareModalUI
      visible={shareModalVisible}
      sharedLink={sharedLink}
      onClose={() => {
        toggleShareModalVisible()
        setSharedLink(null)
      }}
    />
  )
}
