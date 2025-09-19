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

type ItemWrapperT = (children: ReactNode, item: DataT) => ReactNode;

export type ItemRenderT = {
  renderPoster: (posterSrc: string) => ReactNode;
  renderTitle: (title: string) => ReactNode;
  renderDateDescription: (dateDescription: string) => ReactNode;
  renderVenueName: (venueName: string) => ReactNode;
  renderItemWrapper: ItemWrapperT;
};
