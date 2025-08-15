import { useWindowWidth } from '@/shared/lib/use-window-width';
import { breakpoints } from '@coldsurfers/ocean-road';
import { useMemo } from 'react';
import { match } from 'ts-pattern';

export const useInfiniteHomeCollection = () => {
  const windowWidth = useWindowWidth();

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

  return useMemo(
    () => ({
      perPageItemCount,
      itemWidthPercent,
    }),
    [perPageItemCount, itemWidthPercent]
  );
};
