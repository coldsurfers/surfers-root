import { apiClient } from '@/lib/api/openapi-client';
import type { components } from '@/types/api';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

type SubscribedConcertPaginatedData = InfiniteData<
  components['schemas']['EventSubscribeDTOSchema'],
  number
>;

export const useToggleSubscribeConcert = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateSubscribeConcert } = useMutation<
    components['schemas']['EventSubscribeDTOSchema'],
    OpenApiError,
    { eventId: string }
  >({
    mutationFn: (variables) => apiClient.subscribe.subscribeEvent({ eventId: variables.eventId }),
    onMutate: async (variables) => {
      const { eventId } = variables;

      // subscribe/eventSubscribe
      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      });
      // @todo: fix this date and subscribe response schema type
      const newSubscribedEvent = {
        eventId,
        subscribedAt: new Date().toISOString(),
        userId: '',
      } satisfies components['schemas']['EventSubscribeDTOSchema'];
      queryClient.setQueryData(
        apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
        newSubscribedEvent
      );

      // subscribe/eventList
      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.eventList({}),
      });
      const previousSubscribedConcertList =
        queryClient.getQueryData<SubscribedConcertPaginatedData>(
          apiClient.subscribe.queryKeys.eventList({})
        );
      const newSubscribedEventList: SubscribedConcertPaginatedData = {
        pageParams: previousSubscribedConcertList?.pageParams ?? [0],
        pages: [newSubscribedEvent, ...(previousSubscribedConcertList?.pages.flat() ?? [])],
      };
      queryClient.setQueryData<SubscribedConcertPaginatedData>(
        apiClient.subscribe.queryKeys.eventList({}),
        newSubscribedEventList
      );

      return {
        newSubscribedEvent,
        newSubscribedEventList,
      };
    },
    onSettled: async (data) => {
      if (!data) {
        return;
      }
      const { eventId } = data;
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.infoMe,
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventList({}),
      });
    },
  });
  const { mutate: mutateUnsubscribeConcert } = useMutation<
    components['schemas']['EventSubscribeDTOSchema'],
    OpenApiError,
    { eventId: string }
  >({
    mutationFn: (variables) => apiClient.subscribe.unsubscribeEvent({ eventId: variables.eventId }),
    onMutate: async (variables) => {
      const { eventId } = variables;
      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      });
      queryClient.setQueryData(apiClient.subscribe.queryKeys.eventSubscribe({ eventId }), null);

      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.eventList({}),
      });
      const prevPaginatedData = queryClient.getQueryData<SubscribedConcertPaginatedData>(
        apiClient.subscribe.queryKeys.eventList({})
      );
      const newSubscribedEventList: SubscribedConcertPaginatedData = {
        pageParams: prevPaginatedData?.pageParams ?? [0],
        pages: (prevPaginatedData?.pages.flat() ?? []).filter((v) => v?.eventId !== eventId),
      };
      queryClient.setQueryData<SubscribedConcertPaginatedData>(
        apiClient.subscribe.queryKeys.eventList({}),
        newSubscribedEventList
      );

      return {
        newSubscribedEventList,
      };
    },
    onSettled: (data) => {
      if (!data) {
        return;
      }
      const { eventId } = data;
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.infoMe,
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventList({}),
      });
    },
  });

  const subscribeConcert = useCallback(
    ({ isSubscribed, eventId }: { isSubscribed: boolean; eventId: string }) => {
      if (isSubscribed) {
        mutateUnsubscribeConcert({
          eventId,
        });
      } else {
        mutateSubscribeConcert({
          eventId,
        });
      }
    },
    [mutateSubscribeConcert, mutateUnsubscribeConcert]
  );

  return subscribeConcert;
};
