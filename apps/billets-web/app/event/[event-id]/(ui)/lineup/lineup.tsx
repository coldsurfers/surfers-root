'use client'

import { memo } from 'react'
import { LineupItem } from './lineup-item'

type LineupProps = {
  artists: {
    id: string
    name: string
  }[]
}

export const Lineup = memo(({ artists }: LineupProps) => {
  return (
    <>
      {artists.map((artist) => (
        <LineupItem key={artist.id} artist={artist} />
      ))}
    </>
  )
})
