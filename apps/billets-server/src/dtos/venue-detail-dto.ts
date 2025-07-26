import type { z } from 'zod';
import { EventDTOSchema } from './event.dto';
import { VenueDTOSchema } from './venue.dto';

export const VenueDetailDTOSchema = VenueDTOSchema.extend({
  upcomingEvents: EventDTOSchema.array(),
});
export type VenueDetailDTO = z.infer<typeof VenueDetailDTOSchema>;
