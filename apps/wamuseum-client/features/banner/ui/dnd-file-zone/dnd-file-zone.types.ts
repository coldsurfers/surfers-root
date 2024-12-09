import { DragEvent, PropsWithChildren } from 'react'

export type DndFileZoneProps = PropsWithChildren<{
  bgColor: string
  width: number
  height: number
  aspectRatio: string
  onFileDrop: (e: DragEvent<HTMLDivElement>) => void
}>
