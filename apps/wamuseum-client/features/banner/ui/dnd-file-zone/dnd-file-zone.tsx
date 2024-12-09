import { forwardRef, useState } from 'react'
import { DropHereText, StyledBannerZone } from './dnd-file-zone.styled'
import { DndFileZoneProps } from './dnd-file-zone.types'

export const DndFileZone = forwardRef<HTMLDivElement, DndFileZoneProps>(
  ({ bgColor, children, width, height, aspectRatio, onFileDrop }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [isFileDropped, setIsFileDropped] = useState(false)

    return (
      <StyledBannerZone
        ref={ref}
        $bgColor={bgColor}
        $width={width}
        $height={height}
        $aspectRatio={aspectRatio}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
        onDrop={(e) => {
          onFileDrop(e)
          setIsFileDropped(true)
          setIsDragging(false)
        }}
        $shouldShowBorder={!isFileDropped}
        $isDragging={isDragging}
      >
        {children}
        {isDragging && <DropHereText as="h2">Drop Here!</DropHereText>}
      </StyledBannerZone>
    )
  },
)
