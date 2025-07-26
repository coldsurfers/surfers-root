import type { ZodScreenParams, zodScreen } from '@/lib/navigations';
import type { EventStackScreenProps } from '@/navigations/event-stack-navigation';

export type EventCategoryScreenParams = ZodScreenParams<typeof zodScreen.EventCategoryScreen>;
export type EventCategoryScreenProps = EventStackScreenProps<
  typeof zodScreen.EventCategoryScreen.name
>;
