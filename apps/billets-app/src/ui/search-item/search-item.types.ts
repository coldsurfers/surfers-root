import type { ReactNode } from 'react';

export type SearchItemProps = {
  type: 'artist' | 'venue' | 'concert';
  thumbnail: ReactNode;
  title: string;
  subtitle: string;
  description?: string;
  onPress?: () => void;
};
