'use client'

import { GLOBAL_Z_INDEX } from '@/libs/constants'
import { useCommonUIStore } from '@/libs/stores'
import { Modal } from '@coldsurfers/ocean-road'
import { FloatingSearchBarWrapper, FloatingSearchTextInput } from './floating-search-bar.styled'

export const FloatingSearchBar = () => {
  const { floatingSearchBarVisible, closeFloatingSearchBar } = useCommonUIStore()
  return (
    <Modal visible={floatingSearchBarVisible} onClose={closeFloatingSearchBar} zIndex={GLOBAL_Z_INDEX.APP_HEADER + 1}>
      <FloatingSearchBarWrapper>
        <FloatingSearchTextInput placeholder="🔎 어떤 공연을 찾고 싶으세요?" />
      </FloatingSearchBarWrapper>
    </Modal>
  )
}
