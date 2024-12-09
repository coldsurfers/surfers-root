import { forwardRef, useState } from 'react'
import { DropHereText, StyledBannerImg, StyledBannerZone } from './dnd-file-zone.styled'
import { DndFileZoneProps } from './dnd-file-zone.types'

export const DndFileZone = forwardRef<HTMLDivElement, DndFileZoneProps>(
  ({ bgColor, children, width, height, aspectRatio }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [previewUrl, setPreviewUrl] = useState('')
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
          e.preventDefault()
          const droppedFiles = Array.from(e.dataTransfer.files)
          const [bannerImgFile] = droppedFiles
          setPreviewUrl(URL.createObjectURL(bannerImgFile))
          setIsDragging(false)
        }}
        $shouldShowBorder={!previewUrl}
        $isDragging={isDragging}
      >
        {children}
        {previewUrl && <StyledBannerImg src={previewUrl} />}
        {isDragging && <DropHereText as="h2">Drop Here!</DropHereText>}
      </StyledBannerZone>
    )
  },
)
