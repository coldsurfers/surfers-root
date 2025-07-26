'use client';

import type { components } from '@coldsurfers/api-sdk';
import { memo } from 'react';
import { LineupItem } from './lineup-item';

type LineupProps = {
  artists: components['schemas']['ArtistDTOSchema'][];
};

export const Lineup = memo(({ artists }: LineupProps) => {
  return (
    <>
      {artists.map((artist) => (
        <LineupItem key={artist.id} artist={artist} />
      ))}
    </>
  );
});
