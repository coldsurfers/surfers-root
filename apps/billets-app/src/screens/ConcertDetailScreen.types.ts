import {ConcertStackScreenProp} from '../navigations/ConcertStackNavigation.types';

export type ConcertDetailScreenParam = {
  concertId: string;
};
export type ConcertDetailScreenProp =
  ConcertStackScreenProp<'ConcertDetailScreen'>;
