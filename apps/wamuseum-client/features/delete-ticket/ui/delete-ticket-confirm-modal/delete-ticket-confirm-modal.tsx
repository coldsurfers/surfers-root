import { Button, Modal, Text } from '@coldsurfers/ocean-road';
import { useCallback } from 'react';
import {
  ConcertTicketsDocument,
  type ConcertTicketsQuery,
  type ConcertTicketsQueryVariables,
  useRemoveConcertTicketMutation,
} from 'src/__generated__/graphql';

export const DeleteTicketConfirmModal = ({
  visible,
  onClose,
  concertId,
  ticketId,
  onDeleteSuccess,
}: {
  visible: boolean;
  onDeleteSuccess?: () => void;
  onClose: () => void;
  concertId: string;
  ticketId: string;
}) => {
  const [mutateRemoveConcertTicket, { loading: loadingRemoveConcertTicket }] =
    useRemoveConcertTicketMutation();
  const onClickDelete = useCallback(() => {
    if (loadingRemoveConcertTicket) {
      return;
    }
    mutateRemoveConcertTicket({
      variables: {
        input: {
          concertId,
          ticketId,
        },
      },
      onCompleted: () => {
        onDeleteSuccess?.();
      },
      update: (cache, { data }) => {
        if (data?.removeConcertTicket?.__typename !== 'Ticket') {
          return;
        }
        const { removeConcertTicket: removedConcertTicketData } = data;
        const concertTicketsCache = cache.readQuery<
          ConcertTicketsQuery,
          ConcertTicketsQueryVariables
        >({
          query: ConcertTicketsDocument,
          variables: {
            concertId,
          },
        });

        if (concertTicketsCache?.concertTickets?.__typename === 'TicketList') {
          cache.writeQuery({
            query: ConcertTicketsDocument,
            variables: {
              concertId,
            },
            data: {
              concertTickets: {
                ...concertTicketsCache.concertTickets,
                list: concertTicketsCache.concertTickets.list?.filter(
                  (value) => value?.id !== removedConcertTicketData.id
                ),
              },
            },
          });
        }
      },
    });
  }, [concertId, loadingRemoveConcertTicket, mutateRemoveConcertTicket, onDeleteSuccess, ticketId]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <Text>확인을 누르면 해당 티켓을 삭제해요.</Text>
      <Button theme="pink" onClick={onClickDelete}>
        확인
      </Button>
    </Modal>
  );
};
