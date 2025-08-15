import { apiClient, initialPageQuery } from '@/libs/openapi-client';
import { useWindowWidth } from '@/shared/lib/use-window-width';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { breakpoints } from '@coldsurfers/ocean-road';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { match } from 'ts-pattern';

type DataT = Awaited<ReturnType<typeof apiClient.venue.getVenueDetailBySlug>>;
type MutableDataT = {
  name: string;
  upcomingEvents: (DataT['upcomingEvents'][number] | { type: 'empty' })[];
};

export const useInfiniteHomeCollection = (slug: string) => {
  const windowWidth = useWindowWidth();

  const { data: serverData } = useSuspenseQuery<DataT, OpenApiError, MutableDataT>({
    queryKey: initialPageQuery.homeVenueCollection(slug).queryKey,
    queryFn: () => apiClient.venue.getVenueDetailBySlug(slug),
  });

  const infiniteCollectionItemsCount = useMemo(() => {
    return match(windowWidth)
      .when(
        (width) => width > breakpoints['x-large'],
        () => 18
      )
      .when(
        (width) => width > breakpoints.large,
        () => 12
      )
      .when(
        (width) => width > breakpoints.medium,
        () => 9
      )
      .otherwise(() => 9);
  }, [windowWidth]);

  const cloneData = useCallback(() => {
    let data: (typeof serverData)['upcomingEvents'] = serverData.upcomingEvents;
    if (data.length >= infiniteCollectionItemsCount) {
      data = serverData.upcomingEvents.slice(0, infiniteCollectionItemsCount);
      return data;
    }
    while (data.length < infiniteCollectionItemsCount) {
      data.push(...serverData.upcomingEvents);
    }
    return data;
  }, [serverData.upcomingEvents, infiniteCollectionItemsCount]);

  const [infiniteData, setInfiniteData] =
    useState<(typeof serverData)['upcomingEvents']>(cloneData);

  const perPageItemCount = useMemo(() => {
    return match(windowWidth)
      .when(
        (width) => width > breakpoints['x-large'],
        () => 6
      )
      .when(
        (width) => width > breakpoints.large,
        () => 4
      )
      .when(
        (width) => width > breakpoints.medium,
        () => 3
      )
      .otherwise(() => 3);
  }, [windowWidth]);

  const itemWidthPercent = useMemo(() => {
    return match(windowWidth)
      .when(
        (width) => width > breakpoints['x-large'],
        () => 16
      )
      .when(
        (width) => width > breakpoints.large,
        () => 24
      )
      .when(
        (width) => width > breakpoints.medium,
        () => 32
      )
      .otherwise(() => 32);
  }, [windowWidth]);

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

  useLayoutEffect(() => {
    setInfiniteData(cloneData);
  }, [cloneData]);

  return useMemo(
    () => ({
      perPageItemCount,
      itemWidthPercent,
      data: {
        collectionItems: infiniteData,
        collectionTitle: serverData.name,
      },
      flushNextPage,
    }),
    [perPageItemCount, itemWidthPercent, infiniteData, flushNextPage, serverData.name]
  );
};
