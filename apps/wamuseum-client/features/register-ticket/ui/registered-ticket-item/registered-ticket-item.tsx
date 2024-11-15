import useRemoveConcertTicket from '@/app/concert/[id]/mutations/useRemoveConcertTicket'
import {
  concertTicketsQuery,
  UseConcertTicketsDataT,
  UseConcertTicketsInputT,
} from '@/app/concert/[id]/queries/useConcertTickets'
import { Button, Text } from '@coldsurfers/ocean-road'
import { useCallback } from 'react'
import { Maybe, Ticket } from 'src/__generated__/graphql'

export const RegisteredTicketItem = ({ ticket, concertId }: { ticket: Maybe<Ticket>; concertId: string }) => {
  const [mutateRemoveConcertTicket, { loading: loadingRemoveConcertTicket }] = useRemoveConcertTicket()
  const onClickDelete = useCallback(() => {
    if (!ticket) {
      return
    }
    if (loadingRemoveConcertTicket) {
      return
    }
    mutateRemoveConcertTicket({
      variables: {
        input: {
          concertId,
          ticketId: ticket.id,
        },
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
  }, [concertId, loadingRemoveConcertTicket, mutateRemoveConcertTicket, ticket])

  if (!ticket) {
    return null
  }
  return (
    <div key={ticket.id} style={{ display: 'flex', alignItems: 'center' }}>
      <Text>{ticket.seller}</Text>
      <Text style={{ marginLeft: 8 }}>{ticket.sellingURL}</Text>
      <Text style={{ marginLeft: 8 }}>{ticket.openDate}</Text>
      <Button
        style={{
          width: 10,
          height: 10,
        }}
        theme={'pink'}
        onClick={onClickDelete}
      >
        ✘
      </Button>
    </div>
  )
}
