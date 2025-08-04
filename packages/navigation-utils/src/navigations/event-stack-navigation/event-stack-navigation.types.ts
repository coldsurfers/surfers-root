import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ConcertTicketListScreenParams } from '../../screens/concert-ticket-list-screen';
import type { EventCategoryScreenParams } from '../../screens/event-category-screen';
import type { EventDetailScreenParams } from '../../screens/event-detail-screen';
import {
  type ZodNavigationParamList,
  type ZodNavigationParams,
  type zodNavigation,
  zodScreen,
} from '../../utils';
import type { MainStackScreenProps } from '../main-stack-navigation';

export type EventStackParams = ZodNavigationParams<typeof zodNavigation.EventStackNavigation>;

export type EventStackParamList = ZodNavigationParamList<{
  [zodScreen.EventDetailScreen.name]: EventDetailScreenParams;
  [zodScreen.ConcertTicketListScreen.name]: ConcertTicketListScreenParams;
  [zodScreen.EventCategoryScreen.name]: EventCategoryScreenParams;
}>;

export type EventStackScreenProps<T extends keyof EventStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<EventStackParamList, T>,
  MainStackScreenProps<typeof zodNavigation.EventStackNavigation.name>
>;
