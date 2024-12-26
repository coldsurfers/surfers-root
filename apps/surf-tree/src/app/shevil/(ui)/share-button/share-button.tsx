'use client'

import { semantics } from '@coldsurfers/ocean-road'
import { StyledShareButton, StyledShareIcon } from './share-button.styled'

export function ShareButton({ onClickShare }: { onClickShare?: () => void }) {
  return (
    <StyledShareButton
      whileHover={{
        scale: 1.1, // Button scales up slightly on hover
        backgroundColor: semantics.color.background[2], // Changes background color
      }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.stopPropagation()
        onClickShare?.()
      }}
    >
      <StyledShareIcon />
    </StyledShareButton>
  )
}
