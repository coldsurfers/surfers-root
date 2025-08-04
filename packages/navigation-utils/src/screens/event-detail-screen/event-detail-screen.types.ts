import type { EventStackScreenProps } from '../../navigations/event-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type EventDetailScreenParams = ZodScreenParams<typeof zodScreen.EventDetailScreen>;

export type EventDetailScreenProps = EventStackScreenProps<typeof zodScreen.EventDetailScreen.name>;
