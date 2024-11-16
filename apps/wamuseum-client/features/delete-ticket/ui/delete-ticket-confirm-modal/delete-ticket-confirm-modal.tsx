import useRemoveConcertTicket from '@/app/concert/[id]/mutations/useRemoveConcertTicket'
import {
  concertTicketsQuery,
  UseConcertTicketsDataT,
  UseConcertTicketsInputT,
} from '@/app/concert/[id]/queries/useConcertTickets'
import { Button, Modal, Text } from '@coldsurfers/ocean-road'
import { useCallback } from 'react'

export const DeleteTicketConfirmModal = ({
  visible,
  onClose,
  concertId,
  ticketId,
  onDeleteSuccess,
}: {
  visible: boolean
  onDeleteSuccess?: () => void
  onClose: () => void
  concertId: string
  ticketId: string
}) => {
  const [mutateRemoveConcertTicket, { loading: loadingRemoveConcertTicket }] = useRemoveConcertTicket()
  const onClickDelete = useCallback(() => {
    if (loadingRemoveConcertTicket) {
      return
    }
    mutateRemoveConcertTicket({
      variables: {
        input: {
          concertId,
          ticketId,
        },
      },
      onCompleted: () => {
        onDeleteSuccess?.()
      },
      update: (cache, { data }) => {
        if (data?.removeConcertTicket.__typename !== 'Ticket') {
          return
        }
        const { removeConcertTicket: removedConcertTicketData } = data
        const cacheData = cache.readQuery<UseConcertTicketsDataT, UseConcertTicketsInputT>({
          query: concertTicketsQuery,
          variables: {
            concertId,
          },
        })

        if (cacheData?.concertTickets.__typename === 'TicketList') {
          cache.writeQuery({
            query: concertTicketsQuery,
            variables: {
              concertId,
            },
            data: {
              concertTickets: {
                ...cacheData.concertTickets,
                list: cacheData.concertTickets.list?.filter((value) => value?.id !== removedConcertTicketData.id),
              },
            },
          })
        }
      },
    })
  }, [concertId, loadingRemoveConcertTicket, mutateRemoveConcertTicket, onDeleteSuccess, ticketId])

  return (
    <Modal visible={visible} onClose={onClose}>
      <Text>확인을 누르면 해당 티켓을 삭제해요.</Text>
      <Button theme="pink" onClick={onClickDelete}>
        확인
      </Button>
    </Modal>
  )
}
