import type { DragEvent, PropsWithChildren } from 'react';

export type DndFileZoneProps = PropsWithChildren<{
  onFileDrop: (e: DragEvent<HTMLDivElement>) => void;
  className?: string;
}>;
