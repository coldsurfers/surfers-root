import { z } from 'zod'
import { mapPointSchema } from '../../map.types'

export type ConcertMapMarkerProps = {
  clusters: z.TypeOf<typeof mapPointSchema>[]
}
