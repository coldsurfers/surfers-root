import { breakpoints as oceanRoadBreakPoints } from '@coldsurfers/ocean-road';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { useWindowWidth } from '../../hooks';
import type { BreakpointT, DataT } from './infinite-carousel.types';

type Props = {
  breakpoints: BreakpointT[];
  data: DataT[];
};

export const useInfiniteHomeCollection = ({ breakpoints, data }: Props) => {
  const windowWidth = useWindowWidth();

  const infiniteCollectionItemsCount = useMemo(() => {
    const sortedByLargeBreakpoint = breakpoints.sort(
      (a, b) => b.windowWidthLargerThan - a.windowWidthLargerThan
    );

    const targetItemsCount =
      sortedByLargeBreakpoint.find(
        ({ windowWidthLargerThan }) => windowWidthLargerThan < windowWidth
      )?.perPageItemCount ??
      sortedByLargeBreakpoint.at(-1)?.perPageItemCount ??
      0;

    return targetItemsCount * 3;
  }, [windowWidth, breakpoints]);

  const cloneData = useCallback(() => {
    if (data.length >= infiniteCollectionItemsCount) {
      data = data.slice(0, infiniteCollectionItemsCount);
      return data;
    }
    while (data.length < infiniteCollectionItemsCount) {
      data.push(...data);
    }
    return data;
  }, [data, infiniteCollectionItemsCount]);

  const [infiniteData, setInfiniteData] = useState<typeof data>(cloneData);

  const perPageItemCount = useMemo(() => {
    const sortedByLargeBreakpoint = breakpoints.sort(
      (a, b) => b.windowWidthLargerThan - a.windowWidthLargerThan
    );

    const targetItemsCount =
      sortedByLargeBreakpoint.find(
        ({ windowWidthLargerThan }) => windowWidthLargerThan < windowWidth
      )?.perPageItemCount ??
      sortedByLargeBreakpoint.at(-1)?.perPageItemCount ??
      0;

    return targetItemsCount;
  }, [windowWidth, breakpoints]);

  const itemWidthPercent = useMemo(() => {
    const sortedByLargeBreakpoint = breakpoints.sort(
      (a, b) => b.windowWidthLargerThan - a.windowWidthLargerThan
    );

    const itemWidthPercent =
      sortedByLargeBreakpoint.find(
        ({ windowWidthLargerThan }) => windowWidthLargerThan < windowWidth
      )?.itemWidthPercent ??
      sortedByLargeBreakpoint.at(-1)?.itemWidthPercent ??
      0;

    return itemWidthPercent;
  }, [windowWidth, breakpoints]);

  const initialRotatePercent = useMemo(() => {
    const sideBarWidth = windowWidth > oceanRoadBreakPoints['x-large'] ? 2 : 5;

    return -(perPageItemCount * itemWidthPercent) + sideBarWidth;
  }, [perPageItemCount, itemWidthPercent, windowWidth]);

  const flushNextPage = useCallback(() => {
    flushSync(() => {
      setInfiniteData((prev) => {
        const newData = [...prev];

        const pre = newData.slice(0, perPageItemCount);
        const middle = newData.slice(perPageItemCount, perPageItemCount * 2);
        const final = newData.slice(perPageItemCount * 2, perPageItemCount * 3);
        return [...middle, ...final, ...pre];
      });
    });
  }, [perPageItemCount]);

  const flushPrevPage = useCallback(() => {
    flushSync(() => {
      setInfiniteData((prev) => {
        const newData = [...prev];

        const pre = newData.slice(0, perPageItemCount);
        const middle = newData.slice(perPageItemCount, perPageItemCount * 2);
        const final = newData.slice(perPageItemCount * 2, perPageItemCount * 3);
        return [...final, ...pre, ...middle];
      });
    });
  }, [perPageItemCount]);

  useLayoutEffect(() => {
    setInfiniteData(cloneData);
  }, [cloneData]);

  return useMemo(
    () => ({
      perPageItemCount,
      itemWidthPercent,
      initialRotatePercent,
      data: {
        carouselItems: infiniteData,
      },
      flushNextPage,
      flushPrevPage,
    }),
    [
      perPageItemCount,
      itemWidthPercent,
      infiniteData,
      flushNextPage,
      flushPrevPage,
      initialRotatePercent,
    ]
  );
};
