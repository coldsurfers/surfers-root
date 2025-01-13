'use client'

import { memo } from 'react'
import { LineupItem } from './lineup-item'

type LineupProps = {
  artists: {
    id: string
    name: string
    thumbUrl: string | null
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
