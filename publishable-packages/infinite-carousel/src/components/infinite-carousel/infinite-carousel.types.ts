import type { ReactNode } from 'react';

export type BreakpointT = {
  windowWidthLargerThan: number;
  perPageItemCount: number;
  itemWidthPercent: number;
};

export type DataT = {
  posterSrc: string;
  title: string;
  dateDescription: string;
  venueName: string;
};

export type ItemWrapperT = (children: ReactNode, item: DataT) => ReactNode;
