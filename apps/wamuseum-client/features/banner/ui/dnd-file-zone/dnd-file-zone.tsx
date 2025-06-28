import { forwardRef, useState } from 'react';
import { DropHereText, StyledBannerZone } from './dnd-file-zone.styled';
import type { DndFileZoneProps } from './dnd-file-zone.types';

export const DndFileZone = forwardRef<HTMLDivElement, DndFileZoneProps>(
  ({ children, onFileDrop, className }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isFileDropped, setIsFileDropped] = useState(false);

    return (
      <StyledBannerZone
        ref={ref}
        className={className}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          onFileDrop(e);
          setIsFileDropped(true);
          setIsDragging(false);
        }}
        $shouldShowBorder={!isFileDropped}
        $isDragging={isDragging}
      >
        {children}
        {isDragging && <DropHereText as="h2">Drop Here!</DropHereText>}
      </StyledBannerZone>
    );
  }
);
