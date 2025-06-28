import type { SectionListData } from 'react-native';
import type {
  ConcertDetailSectionListAboutItemProps,
  ConcertDetailSectionListDateItemProps,
  ConcertDetailSectionListLineupItemProps,
  ConcertDetailSectionListLocationItemProps,
  ConcertDetailSectionListPriceItemProps,
  ConcertDetailSectionListTicketOpenDateItemProps,
  ConcertDetailSectionListTicketSellerItemProps,
  ConcertDetailSectionListTicketsItemProps,
  ConcertDetailSectionListTitleItemProps,
  ConcertDetailSectionListVenueMapItemProps,
} from '../concert-detail-section-list-item';

export type ConcertDetailSectionListItemT =
  | ConcertDetailSectionListDateItemProps
  | ConcertDetailSectionListLocationItemProps
  | ConcertDetailSectionListPriceItemProps
  | ConcertDetailSectionListTicketOpenDateItemProps
  | ConcertDetailSectionListTitleItemProps
  | ConcertDetailSectionListLineupItemProps
  | ConcertDetailSectionListTicketSellerItemProps
  | ConcertDetailSectionListVenueMapItemProps
  | ConcertDetailSectionListTicketsItemProps
  | ConcertDetailSectionListAboutItemProps;

export type ConcertDetailSectionListSectionT = {
  title:
    | 'venue'
    | 'venue-map'
    | 'date'
    | 'lineup'
    | 'ticket-seller'
    | 'title'
    | 'price-info'
    | 'ticket-open-date'
    | 'tickets'
    | 'about';
  sectionHeaderTitle?:
    | '라인업'
    | '티켓 판매처'
    | '가격 정보'
    | '공연 날짜'
    | '공연 장소'
    | '티켓 오픈 날짜'
    | '종합 정보'
    | '티켓'
    | '소개';
};

export type ConcertDetailSectionListSection = SectionListData<
  ConcertDetailSectionListItemT,
  ConcertDetailSectionListSectionT
>;

export type ConcertDetailSectionListSections = ReadonlyArray<ConcertDetailSectionListSection>;

export interface ConcertDetailSectionListProps {
  sections: ConcertDetailSectionListSections;
  thumbnails: string[];
  isSubscribed?: boolean;
  onPressSubscribe?: () => void;
  ListFooterComponent?: React.ComponentType<unknown> | React.ReactElement | null;
}
