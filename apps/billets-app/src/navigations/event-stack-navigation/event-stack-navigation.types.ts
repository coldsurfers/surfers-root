import {
  type ZodNavigationParamList,
  type ZodNavigationParams,
  type zodNavigation,
  zodScreen,
} from '@/lib';
import type { ConcertTicketListScreenParams, EventDetailScreenParams } from '@/screens';
import type { EventCategoryScreenParams } from '@/screens/event-category-screen';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
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
