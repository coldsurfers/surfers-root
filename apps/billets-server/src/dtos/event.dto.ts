import { z } from 'zod';
import { ConcertDTOSchema, ConcertDetailDTOSchema } from './concert.dto';
import { TicketPromotionDTOSchema } from './ticket.dto';

export const EventDTOSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('concert'),
    data: ConcertDTOSchema,
  }),
]);
export type EventDTO = z.infer<typeof EventDTOSchema>;

export const EventDetailDTOSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('concert'),
    data: ConcertDetailDTOSchema.extend({
      ticketPromotion: TicketPromotionDTOSchema.nullable(),
    }),
  }),
]);
export type EventDetailDTO = z.infer<typeof EventDetailDTOSchema>;

export const GetEventsQueryStringDTOSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).default(20),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  /**
   * @TODO: locationCityId should be replaced by locationCityName
   */
  locationCityId: z.string().uuid().optional(),
  locationCityName: z.string().optional(),
  eventCategoryName: z.string().optional(),
});
export type GetEventsQueryStringDTO = z.infer<typeof GetEventsQueryStringDTOSchema>;

export const GetEventDetailByIdParamsDTOSchema = z.object({
  eventId: z.string(),
});
export type GetEventDetailByIdParamsDTO = z.infer<typeof GetEventDetailByIdParamsDTOSchema>;

export const GetEventDetailBySlugParamsDTOSchema = z.object({
  slug: z.string(),
});
export type GetEventDetailBySlugParamsDTO = z.infer<typeof GetEventDetailBySlugParamsDTOSchema>;

export const GetEventDetailBySlugQuerystringDTOSchema = z.object({
  slug: z.string().optional(),
});
export type GetEventDetailBySlugQuerystringDTO = z.infer<
  typeof GetEventDetailBySlugQuerystringDTOSchema
>;
