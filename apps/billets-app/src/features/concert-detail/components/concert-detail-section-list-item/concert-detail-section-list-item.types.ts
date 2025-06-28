import type { components } from '@coldsurfers/api-sdk';

export interface ConcertDetailSectionListDateItemProps {
  date: string;
  isKOPIS?: boolean;
}
export interface ConcertDetailSectionListLocationItemProps {
  location: string;
}
export interface ConcertDetailSectionListPriceItemProps {
  priceInfo: {
    description: string;
    price: string;
  };
}
export interface ConcertDetailSectionListTicketOpenDateItemProps {
  openDate: string;
  description: string;
}
export interface ConcertDetailSectionListTitleItemProps {
  title: string;
}
export type ConcertDetailSectionListLineupItemProps = {
  thumbUrl: string;
  name: string;
  artistId: string;
  onPress?: () => void;
};
export type ConcertDetailSectionListTicketSellerItemProps = {
  siteUrl: string;
  name: string;
};
export type ConcertDetailSectionListVenueMapItemProps = {
  latitude: number;
  longitude: number;
  address: string;
  onPressMap?: () => void;
  onPressProfile?: () => void;
  venueTitle: string;
  venueId: string;
};

export type ConcertDetailSectionListTicketsItemProps = {
  tickets: components['schemas']['TicketDTOSchema'][];
  onPressCta?: () => void;
};

export type ConcertDetailSectionListAboutItemProps = {
  detailImages: components['schemas']['DetailImageDTOSchema'][];
};
