'use client'

import { memo } from 'react'
import { components } from 'types/api'
import { LineupItem } from './lineup-item'

type LineupProps = {
  artists: components['schemas']['ArtistDTOSchema'][]
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
