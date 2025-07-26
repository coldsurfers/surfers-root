import type { z } from 'zod';
import { ArtistDTOSchema } from './artist.dto';
import { EventDTOSchema } from './event.dto';

export const ArtistDetailDTOSchema = ArtistDTOSchema.extend({
  upcomingEvents: EventDTOSchema.array(),
});
export type ArtistDetailDTO = z.infer<typeof ArtistDetailDTOSchema>;
