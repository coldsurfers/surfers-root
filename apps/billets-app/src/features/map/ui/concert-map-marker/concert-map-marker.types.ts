import type { z } from 'zod';
import type { mapPointSchema } from '../../map.types';

export type ConcertMapMarkerProps = {
  clusters: z.TypeOf<typeof mapPointSchema>[];
};
