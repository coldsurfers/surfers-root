import type { components } from '@/types/api';

type VenueDetailConcertListItemType = {
  date: string | null;
  id: string;
  title: string;
};

export type VenueDetailConcertListItemProps = {
  item: components['schemas']['ConcertDTOSchema'];
  onPress: (item: VenueDetailConcertListItemType) => void;
  onPressSubscribe: (params: { concertId: string; isSubscribed: boolean }) => void;
};
