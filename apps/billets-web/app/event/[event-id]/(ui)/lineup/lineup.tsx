'use client'

import { memo } from 'react'
import { LineupItem } from './lineup-item'

type LineupProps = {
  lineupData: {
    profileImageUrl: string
    name: string
    id: string
  }[]
}

export const Lineup = memo(({ lineupData }: LineupProps) => {
  return (
    <>
      {lineupData.map((artist) => (
        <LineupItem key={artist.id} {...artist} />
      ))}
    </>
  )
})
