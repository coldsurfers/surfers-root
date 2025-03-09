'use client'

import { GLOBAL_Z_INDEX } from '@/libs/constants'
import { Modal } from '@coldsurfers/ocean-road'
import { FloatingSearchBarWrapper } from './floating-search-bar.styled'

export const FloatingSearchBar = () => {
  return (
    <Modal visible onClose={() => {}} zIndex={GLOBAL_Z_INDEX.APP_HEADER + 1}>
      <FloatingSearchBarWrapper />
    </Modal>
  )
}
