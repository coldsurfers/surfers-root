import type { EventStackScreenProps } from '../../navigations/event-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type EventCategoryScreenParams = ZodScreenParams<typeof zodScreen.EventCategoryScreen>;
export type EventCategoryScreenProps = EventStackScreenProps<
  typeof zodScreen.EventCategoryScreen.name
>;
