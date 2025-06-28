import type { components } from '@/types/api';

export type ArtistDetailConcertListItemProps = {
  item: components['schemas']['ConcertDTOSchema'];
  onPress: (item: components['schemas']['ConcertDTOSchema']) => void;
};
