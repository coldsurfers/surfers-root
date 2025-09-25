import { loginProviderSchema } from '@/types/auth';
import { z } from 'zod';

const fbLogEventClickEventSchema = z.object({
  name: z.literal('click_event'),
  params: z.object({
    event_id: z.string(),
  }),
});
const fbLogEventVisitEventDetailSchema = z.object({
  name: z.literal('visit_event_detail'),
  params: z.object({
    event_id: z.string(),
  }),
});
const fbLogEventClickFindTicketSchema = z.object({
  name: z.literal('click_find_ticket'),
  params: z.object({
    seller_name: z.string(),
    url: z.string(),
  }),
});
export const fbLogEventLoginSchema = z.object({
  name: z.literal('login'),
  params: z.object({
    provider: loginProviderSchema,
    user_id: z.string(),
  }),
});
export const fbLogEventLogoutSchema = z.object({
  name: z.literal('logout'),
  params: z.object({}),
});
const fbLogEventSchema = z.discriminatedUnion('name', [
  fbLogEventClickEventSchema,
  fbLogEventVisitEventDetailSchema,
  fbLogEventClickFindTicketSchema,
  fbLogEventLoginSchema,
  fbLogEventLogoutSchema,
]);
export type FBLogEvent = z.infer<typeof fbLogEventSchema>;
